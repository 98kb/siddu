import {Requests} from "./Requests";

export type Message = {
  type: keyof Requests;
  payload: Requests[keyof Requests]["payload"];
};
