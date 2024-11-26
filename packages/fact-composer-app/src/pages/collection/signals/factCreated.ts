import {createSignal} from "@react-rxjs/utils";
import {FactSchema} from "@repo/collection-service-defs";

const [factCreated$, emitFactCreated] = createSignal<FactSchema | undefined>();
export {factCreated$, emitFactCreated};
