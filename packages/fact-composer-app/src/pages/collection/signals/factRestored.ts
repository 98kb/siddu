import {createSignal} from "@react-rxjs/utils";
import {FactSchema} from "@repo/collection-service-defs";
const [factRestored$, emitFactRestored] = createSignal<
  FactSchema | undefined
>();
export {factRestored$, emitFactRestored};
