import {type ClearAccessTokenRequest} from "../dto/ClearAccessTokenRequest";
import {Reader} from "fp-ts/lib/Reader";
import {Task} from "fp-ts/lib/Task";

export interface IAuthService {
  getAccessToken: Task<string | undefined>;
  clearAccessToken: Reader<ClearAccessTokenRequest, Promise<void>>;
}
