import { useRef, useEffect, MutableRefObject } from 'react'

/**
 * Same as `React.useRef` except the ref is updated whenever the value changes. This is useful for decoupling
 * properties such as methods from where they are called.
 *
 * @param value The value to reference
 */
export function useUpdatedRef<T>(value: T): MutableRefObject<T> {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

export default useUpdatedRef
