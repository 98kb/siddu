import {type AccessTokenRequest} from "../dto/AccessTokenRequest";
import {type ClearAccessTokenRequest} from "../dto/ClearAccessTokenRequest";
import {Reader} from "fp-ts/lib/Reader";

export interface IAuthService {
  getAccessToken: Reader<AccessTokenRequest, Promise<string | undefined>>;
  clearAccessToken: Reader<ClearAccessTokenRequest, Promise<void>>;
}
