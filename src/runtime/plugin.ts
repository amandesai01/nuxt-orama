import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { create as createoramaInstance, type AnyOrama } from '@orama/orama';
import type { CreateAnyOramaArguments, NuxtOramaProvider } from './interfaces';
import { DEFAULT_KEY } from './constants';

export default defineNuxtPlugin(async (nuxtApp) => {
  // Skip plugin when rendering error page
  if (nuxtApp.payload.error) {
    return;
  }

  const oramaInstanceRecord: Record<string, AnyOrama> = {};

  const createOramaInstance = async (createArgs: CreateAnyOramaArguments): Promise<AnyOrama> => {
    const id = createArgs.id || DEFAULT_KEY;

    if (oramaInstanceRecord[id]) {
      console.warn(`[nuxt-orama] DB with id ${id} already exists. Overriding it.`)
    }

    oramaInstanceRecord[id] = await createoramaInstance(createArgs);

    return oramaInstanceRecord[id];
  }

  const createArgs = (useRuntimeConfig().public.orama as any).schemas as CreateAnyOramaArguments[];

  for(let i = 0; i < createArgs.length; i++) {
    const arg = createArgs[i];
    await createOramaInstance(arg);
  }

  const nuxtOramaProvider: NuxtOramaProvider = {
    oramaInstanceRecord,
    createOramaInstance,
  }

  nuxtApp.provide('nuxtOrama', nuxtOramaProvider);
})
