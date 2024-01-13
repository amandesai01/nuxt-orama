import { defineNuxtPlugin } from '#app'
import { create as createOramaDB, type AnyOrama } from '@orama/orama';
import type { CreateAnyOramaArguments, NuxtOramaProvider } from '../interfaces';
import { DEFAULT_KEY } from '../constants';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return;
  }

  const oramaDBRecord: Record<string, AnyOrama> = {};

  const createOramaInstance = async (createArgs: CreateAnyOramaArguments): Promise<AnyOrama> => {
    const id = createArgs.id || DEFAULT_KEY;

    if (oramaDBRecord[id]) {
      console.warn(`[nuxt-orama] DB with id ${id} already exists. Overriding it.`)
    }

    oramaDBRecord[id] = await createOramaDB(createArgs);

    return oramaDBRecord[id];
  }

  const createArgs = (useRuntimeConfig().public.orama as any).schemas as CreateAnyOramaArguments[];

  for(let i = 0; i < createArgs.length; i++) {
    const arg = createArgs[i];
    await createOramaInstance(arg);
  }

  const nuxtOramaProvider: NuxtOramaProvider = {
    oramaDBRecord,
    createOramaInstance,
  }

  nuxtApp.provide('nuxtOrama', nuxtOramaProvider);
})
