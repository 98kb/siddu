import {type AccessTokenRequest} from "../dto/AccessTokenRequest";
import {Reader} from "fp-ts/lib/Reader";

export interface IAuthService {
  getAccessToken: Reader<AccessTokenRequest, Promise<string | undefined>>;
}
