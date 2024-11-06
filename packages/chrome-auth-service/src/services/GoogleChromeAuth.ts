import {type ClearAccessTokenRequest} from "../dto/ClearAccessTokenRequest";
import {IAuthService} from "./IAuthService";

export class GoogleChromeAuth implements IAuthService {
  async getAccessToken(): Promise<string | undefined> {
    const {token} = await chrome.identity.getAuthToken({interactive: true});
    return token;
  }

  async clearAccessToken(info: ClearAccessTokenRequest): Promise<void> {
    await chrome.identity.removeCachedAuthToken(info);
  }
}
