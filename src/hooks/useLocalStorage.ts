import { useState, Dispatch, SetStateAction, useRef } from 'react'
import { useDeepCompareEffect } from './useDeepCompareEffect'

const storeValue = <T>(key: string, value: T) => {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    // If user is in private mode or has storage restriction localStorage can throw. Also JSON.stringify can throw.
    console.warn('Error storing value in useLocalStorage hook, value is not being persisted.', {
      error,
      value,
      key,
    })
  }
}

function retrieveValue<T>(key: string, initialValue?: T): T | undefined {
  try {
    const localStorageValue = localStorage.getItem(key)
    if (typeof localStorageValue !== 'string') {
      storeValue(key, initialValue)
      return initialValue
    } else {
      return JSON.parse(localStorageValue || 'null')
    }
  } catch (error) {
    // If user is in private mode or has storage restriction localStorage can throw. Also
    // JSON.stringify/parse can throw.
    console.warn('Error retrieving value in useLocalStorage hook, initialValue is being used.', {
      error,
      initialValue,
      key,
    })
    return initialValue
  }
}

type SetState<T> = Dispatch<SetStateAction<T>>

/**
 * React side-effect hook that manages a single `localStorage` key
 *
 * @param key `localStorage` key to manage
 * @param initialValue initial value to set, if value in `localStorage` is empty.
 */
export function useLocalStorage<T>(key: string): [T | undefined, SetState<T>]
export function useLocalStorage<T>(key: string, initialValue: T): [T, SetState<T>]
export function useLocalStorage<T>(key: string, initialValue?: T): [T | undefined, SetState<T>] {
  const [state, setState] = useState<T>(() => retrieveValue(key, initialValue) as T)
  const currentLoadedKey = useRef(key)

  useDeepCompareEffect(() => storeValue(currentLoadedKey.current, state), [state])

  // If the key changes, reset the state
  useDeepCompareEffect(() => {
    if (currentLoadedKey.current !== key) {
      setState(retrieveValue(key, initialValue) as T)
    }
    currentLoadedKey.current = key
  }, [key, initialValue])

  return [state, setState]
}

export default useLocalStorage
