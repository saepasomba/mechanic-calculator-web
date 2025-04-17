import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for debounced localStorage operations
 * @param key - localStorage key
 * @param initialValue - default value if not found in localStorage
 * @param delay - debounce delay in milliseconds
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  delay: number = 500
): [T, (value: T | ((prevValue: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Debounce the localStorage update
  const debouncedSetLocalStorage = useCallback(
    (value: T) => {
      const handler = setTimeout(() => {
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(value));
          }
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error);
        }
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [key, delay]
  );

  // Update localStorage when the state changes
  useEffect(() => {
    const cleanup = debouncedSetLocalStorage(storedValue);
    return cleanup;
  }, [storedValue, debouncedSetLocalStorage]);

  return [storedValue, setStoredValue];
}
