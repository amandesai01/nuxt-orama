import { insertMultiple as insertMultipleOrama, search as searchOrama, type PartialSchemaDeep, type Results, type SearchParams, type TypedDocument } from "@orama/orama";
import { useNuxtApp } from "nuxt/app";
import { DEFAULT_KEY } from "../../constants";
import type { NuxtOramaProvider } from "../../interfaces";
import { wrapPromiseToRef } from "../../utils";
import { ref, type Ref } from "#imports";

export default function useOramaSearch(id?: string) {
  const key = id || DEFAULT_KEY;
  const nuxtApp = useNuxtApp();

  const provider: NuxtOramaProvider = nuxtApp.$nuxtOrama as NuxtOramaProvider;

  const oramaDB = provider.oramaDBRecord[key];

  if (!oramaDB) {
    if (key == DEFAULT_KEY) {
      throw new Error(`No Orama instance initialsed. Either provide atleast one schema in config, or make sure to create an instance first.`);
    } else {
      throw new Error(`No Orama instance found for id ${key}. Make sure you create one first.`);
    }
  }

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