import { insertMultiple as insertMultipleOrama, search as searchOrama, type PartialSchemaDeep, type Results, type SearchParams } from "@orama/orama";
import { wrapPromiseToRef } from "../../utils";
import { ref, type Ref } from "#imports";
import useOramaInstance from "./useOramaInstance";

export default function useOramaSearch(id?: string) {
  const oramaDB = useOramaInstance(id);

  const searchResults: Ref<Results<any> | null> = ref(null);
  const searchPending: Ref<boolean> = ref(false);
  const searchError: Ref<Error | null> = ref(null);

  const searchWrapped = (searchParams: SearchParams<any>) => {
    const wrappedPromiseToRef = wrapPromiseToRef(searchOrama(oramaDB, searchParams), {
      result: searchResults,
      pending: searchPending,
      error: searchError,
    });

    // did this to rename result to results (to maintain consistency with what orama provides with `search()`).
    return {
      results: wrappedPromiseToRef.result,
      pending: wrappedPromiseToRef.pending,
      error: wrappedPromiseToRef.error,
    };
  }

  const insertMultipleWrapped = (docs: PartialSchemaDeep<any>[], batchSize?: number, language?: string, skipHooks?: boolean, timeout?: number) => {
    return wrapPromiseToRef(insertMultipleOrama(oramaDB, docs, batchSize, language, skipHooks, timeout))
  }

  return {
    search: searchWrapped,
    insertMultiple: insertMultipleWrapped,
    searchResults,
    searchPending,
    searchError,
  }
}