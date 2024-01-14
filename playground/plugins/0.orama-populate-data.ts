import { insertMultiple } from "@orama/orama";
import dummyData from "~/dummy-data";

export default defineNuxtPlugin(async (_) => {
  const orama = useOramaInstance();

  await insertMultiple(orama, dummyData);
})