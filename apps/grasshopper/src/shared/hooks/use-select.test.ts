import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSelect } from "./use-select";

describe("useSelect 훅", () => {
  describe("배열 선택", () => {
    it("배열 아이템을 선택하고 토글할 수 있어야 함", () => {
      const { result } = renderHook(() => useSelect<number[]>());

      act(() => {
        result.current.toggle([1, 2, 3]);
      });

      expect(result.current.selected).toEqual([1, 2, 3]);

      act(() => {
        result.current.toggle([1, 2, 3]);
      });

      expect(result.current.selected).toBeNull();
    });

    it("isSelected가 배열에 대해 올바르게 동작해야 함", () => {
      const { result } = renderHook(() => useSelect<number[]>());

      act(() => {
        result.current.select([1, 2, 3]);
      });

      expect(result.current.isSelected([1, 2, 3])).toBe(true);
      expect(result.current.isSelected([3, 2, 1])).toBe(false);
    });
  });

  describe("객체 선택", () => {
    it("객체를 선택하고 토글할 수 있어야 함", () => {
      const { result } = renderHook(() => useSelect<{ id: number; name: string }>());

      act(() => {
        result.current.toggle({ id: 1, name: "Test" });
      });

      expect(result.current.selected).toEqual({ id: 1, name: "Test" });

      act(() => {
        result.current.toggle({ id: 1, name: "Test" });
      });

      expect(result.current.selected).toBeNull();
    });

    it("isSelected가 객체에 대해 올바르게 동작해야 함", () => {
      const { result } = renderHook(() => useSelect<{ id: number; name: string }>());

      act(() => {
        result.current.select({ id: 1, name: "Test" });
      });

      expect(result.current.isSelected({ id: 1, name: "Test" })).toBe(true);
      expect(result.current.isSelected({ id: 1, name: "Different" })).toBe(false);
    });
  });

  describe("커스텀 매처 함수", () => {
    it("커스텀 매처 함수를 사용하여 선택을 비교해야 함", () => {
      const customMatcher = (prev: { id: number; name: string }, current: { id: number; name: string }) => {
        console.log("test", prev.id === current.id);
        return prev.id === current.id;
      };
      const { result } = renderHook(() => useSelect<{ id: number; name: string }>(null, { matcher: customMatcher }));

      act(() => {
        result.current.select({ id: 1, name: "Test" });
      });

      expect(result.current.isSelected({ id: 1, name: "Different" })).toBe(true);
      expect(result.current.isSelected({ id: 2, name: "Test" })).toBe(false);
    });
  });

  describe("기타 기능", () => {
    it("isNoneChosen이 올바르게 동작해야 함", () => {
      const { result } = renderHook(() => useSelect<string>());

      expect(result.current.isNoneChosen()).toBe(true);

      act(() => {
        result.current.select("Test");
      });

      expect(result.current.isNoneChosen()).toBe(false);
    });

    it("isUnselected가 올바르게 동작해야 함", () => {
      const { result } = renderHook(() => useSelect<string>());

      act(() => {
        result.current.select("Test");
      });

      expect(result.current.isUnselected("Test")).toBe(false);
      expect(result.current.isUnselected("Other")).toBe(true);

      act(() => {
        result.current.toggle("Test");
      });

      expect(result.current.isUnselected("Test")).toBe(true);
    });
  });
});
