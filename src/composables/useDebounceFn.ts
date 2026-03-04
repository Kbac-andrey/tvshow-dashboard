export type Procedure = (...args: never[]) => void | Promise<void>;

export interface DebouncedFn<T extends Procedure> {
  debounced: (...args: Parameters<T>) => void;
  cancel: () => void;
}

export function useDebounceFn<T extends Procedure>(
  fn: T,
  delay: number
): DebouncedFn<T> {
  let timer: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };

  const cancel = (): void => clearTimeout(timer);

  return { debounced, cancel };
}
