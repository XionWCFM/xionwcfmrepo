import { useState } from "react";
import { usePreservedCallback } from "./use-preserved-callback";

/**
 * 사용자 정의 훅으로, 임시 상태 값을 관리하는 데 사용됩니다.
 *
 * @template T - 상태 값의 타입 매개변수입니다.
 * @param {UseDraftProps<T>} props - 훅에 전달되는 속성 객체입니다.
 * @returns {{ value: T, onChangeValue: (newValue: T) => void, onCommit: () => Promise<void> | void }} - 훅에서 반환되는 객체입니다.
 *
 * @example
 * const initialState = { name: "", age: 0 };
 * const onCommitHandler = async (state) => {
 *   // 상태 값을 서버에 저장하는 비동기 작업 수행
 *   await saveStateToServer(state);
 * };
 *
 * const { value, onChangeValue, onCommit } = useDraft({ initialState, onCommit: onCommitHandler });
 *
 * // 상태 값 변경
 * onChangeValue({ name: "John", age: 25 });
 *
 * // 상태 값 커밋
 * onCommit();
 */
export const useDraft = <T>(initialState: T) => {
  const [draft, setDraft] = useState<T>();
  const value = draft ?? initialState;
  const onChangeValue = usePreservedCallback(setDraft);

  return [value, onChangeValue] as const;
};
