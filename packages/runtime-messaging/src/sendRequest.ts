import {Requests} from "./Requests";

export function sendRequest<M extends keyof Requests>(
  type: M,
  payload?: Requests[M]["payload"],
): Promise<Requests[M]["result"]> {
  return new Promise<Requests[M]["result"]>(resolve => {
    chrome.runtime.sendMessage({type, payload}, result => {
      resolve(result);
    });
  });
}
