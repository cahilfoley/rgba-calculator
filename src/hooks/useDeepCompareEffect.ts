import { DependencyList, EffectCallback, useEffect, useRef } from 'react'
import isEqual from 'react-fast-compare'
import { useLatestCallback } from './useLatestCallback'

/**
 * Same as `React.useEffect` but uses a deep comparison on the dependency array. This should only
 * be used when working with non-primitive dependencies.
 *
 * @param effect Effect callback to run
 * @param deps Effect dependencies
 */
export function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList) {
  const ref = useRef<DependencyList>(deps)

  // Only update the current dependencies if they are not deep equal
  if (!isEqual(deps, ref.current)) {
    ref.current = deps
  }

  const stableEffect = useLatestCallback(effect)
  useEffect(stableEffect, [stableEffect, ...ref.current])
}
