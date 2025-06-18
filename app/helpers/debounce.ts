type Procedure<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): Procedure<T> & { cancel: () => void } {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null;
  let lastThis: any;
  let calledLeading = false;

  const debounced = function (this: any, ...args: Parameters<T>) {
    lastArgs = args;
    lastThis = this;

    const callNow = options.leading && !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = null;

      if (options.trailing !== false && !options.leading || options.trailing && calledLeading) {
        func.apply(lastThis, lastArgs!);
        calledLeading = false;
      }
    }, wait);

    if (callNow) {
      calledLeading = true;
      func.apply(lastThis, args);
    }
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
}
