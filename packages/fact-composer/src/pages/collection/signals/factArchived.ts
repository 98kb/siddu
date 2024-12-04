import {createSignal} from "@react-rxjs/utils";
import {FactSchema} from "@repo/collection-service-defs";

const [factArchived$, emitFactArchived] = createSignal<
  FactSchema | undefined
>();
export {factArchived$, emitFactArchived};
