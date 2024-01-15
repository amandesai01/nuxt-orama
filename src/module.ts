import { defineNuxtModule, addPlugin, createResolver, addImportsDir } from '@nuxt/kit'
import type { CreateAnyOramaArguments } from './runtime/interfaces';

// Module options TypeScript interface definition
export interface ModuleOptions {
  schemas: CreateAnyOramaArguments[],
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-orama',
    configKey: 'orama'
  },
  defaults: {
    schemas: [],
  },
  setup (options, nuxt) {
    const resolver = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.orama = options;

    addPlugin(resolver.resolve('./runtime/plugin'));
    addImportsDir(resolver.resolve('./runtime/composables'));
  }
})
