import {IAuthService} from "./IAuthService";

export class ChromeAuth implements IAuthService {
  async getAccessToken() {
    const {token} = await chrome.identity.getAuthToken({interactive: true});
    return token;
  }
}
