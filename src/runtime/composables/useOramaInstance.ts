import { useNuxtApp } from "nuxt/app";
import { DEFAULT_KEY } from "../constants";
import type { NuxtOramaProvider } from "../interfaces";
import type { AnyOrama } from "@orama/orama";

export default function useOramaInstance<T extends AnyOrama>(id?: string) {
  const key = id || DEFAULT_KEY;
  const nuxtApp = useNuxtApp();

  const provider: NuxtOramaProvider = nuxtApp.$nuxtOrama as NuxtOramaProvider;

  const oramaInstance = provider.oramaInstanceRecord[key];

  if (!oramaInstance) {
    if (key == DEFAULT_KEY) {
      throw new Error(`No Orama instance initialsed. Either provide atleast one schema in config, or make sure to create an instance first.`);
    } else {
      throw new Error(`No Orama instance found for id ${key}. Make sure you create one first.`);
    }
  }

  return oramaInstance as T;
}