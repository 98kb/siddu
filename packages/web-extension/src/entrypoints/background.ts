import {DexieAdapter} from "@repo/facts-db-adapter";
import {ORM, createFactsDB} from "@repo/facts-db";
import {Router, createRequestHandlers} from "@repo/runtime-messaging";

const db = createFactsDB("facts");
const facts = new ORM(new DexieAdapter(db, "facts"));
const handlers = createRequestHandlers(facts);

// TODO: this is an ugly workaround to make the types work
const reply: Router<"facts"> = (message, sendResponse) => {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handler = handlers[message.type] as Function;
  // eslint-disable-next-line no-useless-call
  handler?.call(undefined, message.payload, sendResponse);
};

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    reply(message, sendResponse);
    return true;
  });
});
