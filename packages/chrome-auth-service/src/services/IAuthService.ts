import {Reader} from "fp-ts/lib/Reader";

export interface IAuthService {
  getAccessToken: Reader<string[], Promise<string | undefined>>;
}
