import {Task} from "fp-ts/lib/Task";
export interface IAuthService {
  getAccessToken: Task<string | undefined>;
}
