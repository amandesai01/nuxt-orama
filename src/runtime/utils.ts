import { ref, type Ref } from "#imports";

export type WrappedPromiseToRef<ResultType = any, ErrorType = Error> = {
  result: Ref<ResultType | null>;
  pending: Ref<boolean>;
  error: Ref<ErrorType | null>;
};

export function wrapPromiseToRef<ResultType = any, ErrorType = Error>(
  promise: Promise<ResultType>,
  bindingOptions?: {
    result?: Ref<ResultType | null>;
    pending?: Ref<boolean>;
    error?: Ref<ErrorType | null>;
  }
): WrappedPromiseToRef<ResultType, ErrorType> {
  const result: Ref<ResultType | null> = bindingOptions?.result || ref(null);
  const pending: Ref<boolean> = bindingOptions?.pending || ref(false);
  const error: Ref<ErrorType | null> = bindingOptions?.error || ref(null);

  pending.value = true;
  promise
    .then((r) => {
      result.value = r;
    })
    .catch((e) => {
      error.value = e;
    })
    .finally(() => {
      pending.value = false;
    });

  return {
    result,
    pending,
    error,
  };
}
