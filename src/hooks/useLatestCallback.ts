import { useCallback } from 'react'
import useUpdatedRef from './useUpdatedRef'

type AnyFunction = (...args: any[]) => any

/**
 * Creates a stable reference to a function.
 *
 * Returns a new function that is stable across renders but will always call the latest version
 * of the provided callback function. If the provided function is undefined then any call will
 * be ignored silently.
 *
 * @typeparam T The call signature of the function
 * @param callback The current value of the callback function
 */
export function useLatestCallback<T extends AnyFunction>(callback?: T): T {
  // Decouple the callback value from renders
  const callbackRef = useUpdatedRef(callback)

  // This callback has the same call signature as the callback passed in but will
  // maintain a stable reference across renders
  const stableCallback = useCallback(
    (...args: any[]) => {
      if (typeof callbackRef.current === 'function') {
        return callbackRef.current(...args)
      }

      if (typeof callbackRef.current !== 'undefined') {
        console.warn(
          `useStableCallback expected an argument of type 'function' or 'undefined' but received type '${typeof callbackRef.current}'`,
          { callback: callbackRef.current },
        )
      }
    },
    [callbackRef],
  )

  return stableCallback as T
}
