import {IAuthService} from "./IAuthService";

export class GoogleChromeAuth implements IAuthService {
  async getAccessToken(scopes: string[] = []): Promise<string | undefined> {
    const {token} = await chrome.identity.getAuthToken({
      interactive: true,
      scopes,
    });
    return token;
  }
}
