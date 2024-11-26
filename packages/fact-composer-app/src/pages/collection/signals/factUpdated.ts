import {createSignal} from "@react-rxjs/utils";
import {FactSchema} from "@repo/collection-service-defs";

const [factUpdated$, emitFactUpdated] = createSignal<FactSchema | undefined>();
export {factUpdated$, emitFactUpdated};
