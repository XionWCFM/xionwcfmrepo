import { useDraft, usePreservedCallback } from "@xionwcfm/react";
import { useCallback } from "react";

export const useSelect = <T>(initialState?: T | null, options?: { matcher?: (prev: T, current: T) => boolean }) => {
  const [state, setState] = useDraft<T | null>(typeof initialState === "undefined" ? null : initialState);

  const match =
    typeof options?.matcher === "function"
      ? options.matcher
      : (prev: T, current: T) => {
          return shallowEqual(prev, current);
        };

  const matcher = usePreservedCallback(match);

  const toggleable = useCallback(
    (item: T | null) => {
      setState((prev) => {
        if (item === null) {
          return null;
        }
        if (prev === null) {
          return item;
        }
        if (matcher(prev, item)) {
          return null;
        }
        return item;
      });
    },
    [setState, matcher],
  );

  const select = useCallback(
    (item: T) => {
      setState(item);
    },
    [setState],
  );

  const isSelected = useCallback(
    (item: T) => {
      if (state === null) {
        return false;
      }
      return matcher(state, item);
    },
    [state, matcher],
  );

  const isUnselected = useCallback(
    (item: T) => {
      if (state === null) {
        return true;
      }
      return !matcher(state, item);
    },
    [state, matcher],
  );

  const isNoneChosen = useCallback(() => state === null, [state]);

  return { selected: state, toggle: toggleable, select, isSelected, isUnselected, isNoneChosen };
};

function is(x: any, y: any) {
  return (
    // biome-ignore lint/suspicious/noSelfCompare: <explanation>
    (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y)
  );
}

const objectIs: (x: any, y: any) => boolean =
  // $FlowFixMe[method-unbinding]
  typeof Object.is === "function" ? Object.is : is;

export function shallowEqual(objA: any, objB: any): boolean {
  if (objectIs(objA, objB)) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];
    if (
      //@ts-expect-error
      !hasOwnProperty.call(objB, currentKey) ||
      //@ts-expect-error
      !objectIs(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}
