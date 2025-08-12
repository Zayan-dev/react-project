import { useState, useCallback } from 'react';

interface UseFormSubmitOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onFinally?: () => void;
}

interface UseFormSubmitReturn<T> {
  isLoading: boolean;
  error: string | null;
  submit: (submitFn: () => Promise<T>) => Promise<void>;
  resetError: () => void;
}

export function useFormSubmit<T = any>(options: UseFormSubmitOptions<T> = {}): UseFormSubmitReturn<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(async (submitFn: () => Promise<T>) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await submitFn();
      options.onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      options.onError?.(err instanceof Error ? err : new Error(errorMessage));
    } finally {
      setIsLoading(false);
      options.onFinally?.();
    }
  }, [options]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    submit,
    resetError,
  };
}

export default useFormSubmit;
