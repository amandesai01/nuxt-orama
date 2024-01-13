import type { AnyOrama, Components, Orama, OramaPlugin, SorterConfig } from '@orama/orama';

// CreateArguments taken from @orama/orama/dist/methods/create.d.ts
export interface CreateAnyOramaArguments<OramaSchema = any, TIndex = any, TDocumentStore = any, TSorter = any> {
  schema: OramaSchema;
  sort?: SorterConfig;
  language?: string;
  components?: Components<Orama<OramaSchema, TIndex, TDocumentStore, TSorter>, OramaSchema, TIndex, TDocumentStore, TSorter>;
  plugins?: OramaPlugin[];
  id?: string;
}

export interface NuxtOramaProvider {
  oramaDBRecord: Record<string, AnyOrama>,
  createOramaInstance: (createArgs: CreateAnyOramaArguments) => Promise<AnyOrama>;
}
