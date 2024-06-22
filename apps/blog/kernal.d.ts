export declare global {
  interface Window {
    clarity: (param: "set", key: string, value: string) => void;
  }
}
