import * as React from "react";

const subscribe = () => () => {};

/**
 * Returns false during server rendering and the first client render, then
 * true afterwards. Used to gate reads of client-only state (like our
 * localStorage-persisted zustand store) without violating the
 * react-hooks/set-state-in-effect rule that a plain
 * `useEffect(() => setMounted(true), [])` pattern would trigger.
 */
export function useHasMounted() {
  return React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
