import {
  insert as insertOrama,
  insertMultiple as insertMultipleOrama,
  search as searchOrama,
  update as updateOrama,
  updateMultiple as updateMultipleOrama,
  remove as removeOrama,
  removeMultiple as removeMultipleOrama,
  getByID as getByIDOrama,
  count as countOrama,
  type PartialSchemaDeep,
  type Results,
  type SearchParams,
  type AnyOrama,
  type TypedDocument,
} from "@orama/orama";

import { wrapPromiseToRef } from "../utils";
import { ref, type Ref } from "#imports";
import useOramaInstance from "./useOramaInstance";

type DocumentID = string | number; // @orama/orama/dist/components/internal-document-id-store

export default function useOramaSearch<T extends AnyOrama>(id?: string) {
  const oramaInstance = useOramaInstance<T>(id);

  const searchResults: Ref<Results<any> | null> = ref(null);
  const searchPending: Ref<boolean> = ref(false);
  const searchError: Ref<Error | null> = ref(null);

  const searchWrapped = (searchParams: SearchParams<any>) => {
    const wrappedPromiseToRef = wrapPromiseToRef(
      searchOrama(oramaInstance, searchParams),
      {
        result: searchResults,
        pending: searchPending,
        error: searchError,
      }
    );

    // did this to rename result to results (to maintain consistency with what orama provides with `search()`).
    return {
      results: wrappedPromiseToRef.result,
      pending: wrappedPromiseToRef.pending,
      error: wrappedPromiseToRef.error,
    };
  };

  const insertMultipleWrapped = (
    docs: PartialSchemaDeep<TypedDocument<T>>[],
    batchSize?: number,
    language?: string,
    skipHooks?: boolean,
    timeout?: number
  ) => {
    return wrapPromiseToRef(
      insertMultipleOrama<T>(
        oramaInstance,
        docs,
        batchSize,
        language,
        skipHooks,
        timeout
      )
    );
  };

  const insertWrapped = (
    doc: PartialSchemaDeep<any>,
    language?: string,
    skipHooks?: boolean
  ) =>
    wrapPromiseToRef(insertOrama<T>(oramaInstance, doc, language, skipHooks));

  const updateMultipleWrapped = (
    ids: string[],
    docs: PartialSchemaDeep<TypedDocument<T>>[],
    batchSize?: number,
    language?: string,
    skipHooks?: boolean
  ) =>
    wrapPromiseToRef(
      updateMultipleOrama<T>(
        oramaInstance,
        ids,
        docs,
        batchSize,
        language,
        skipHooks
      )
    );

  const updateWrapped = (
    id: string,
    doc: PartialSchemaDeep<TypedDocument<T>>,
    language?: string,
    skipHooks?: boolean
  ) =>
    wrapPromiseToRef(
      updateOrama<T>(oramaInstance, id, doc, language, skipHooks)
    );

  const removeMultipleWrapped = (
    ids: DocumentID[],
    batchSize?: number,
    language?: string,
    skipHooks?: boolean
  ) =>
    wrapPromiseToRef(
      removeMultipleOrama<T>(oramaInstance, ids, batchSize, language, skipHooks)
    );

  const removeWrapped = (
    id: DocumentID,
    language?: string,
    skipHooks?: boolean
  ) => wrapPromiseToRef(removeOrama<T>(oramaInstance, id, language, skipHooks));

  const getByIdWrapped = <ResultDocument extends TypedDocument<T>>(
    id: string
  ) => wrapPromiseToRef(getByIDOrama<T, ResultDocument>(oramaInstance, id));

  const countWrapped = () => wrapPromiseToRef(countOrama(oramaInstance));

  const clearSearchResults = () => {
    searchResults.value = null;
  };

  return {
    search: searchWrapped,

    insertMultiple: insertMultipleWrapped,
    insert: insertWrapped,

    updateMultiple: updateMultipleWrapped,
    update: updateWrapped,

    removeMultiple: removeMultipleWrapped,
    remove: removeWrapped,

    getById: getByIdWrapped,
    count: countWrapped,

    searchResults,
    searchPending,
    searchError,
    clearSearchResults,
  };
}
