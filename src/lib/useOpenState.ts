import { useEffect, useState } from "react";
import { getOpenState, type OpenState } from "./hours";

/**
 * Live open/closed state, re-checked every minute.
 *
 * A visitor can sit on the page across the opening or closing minute, and a
 * badge that says "Open now" after closing time is worse than no badge.
 */
export function useOpenState(): OpenState {
  const [state, setState] = useState<OpenState>(() => getOpenState());

  useEffect(() => {
    const id = window.setInterval(() => setState(getOpenState()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return state;
}
