import {Messages} from "./Messages";

export function sendMessage<M extends keyof Messages>(
  type: M,
  payload?: Messages[M]["payload"],
): Promise<Messages[M]["result"]> {
  return new Promise<Messages[M]["result"]>(resolve => {
    chrome.runtime.sendMessage({type, payload}, result => {
      resolve(result);
    });
  });
}
