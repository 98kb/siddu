import {IAuthService} from "../services/IAuthService";

export class AuthClientStub implements IAuthService {
  async getAccessToken(): Promise<string> {
    return "fake-token";
  }

  async clearAccessToken({token}: {token: string}): Promise<void> {
    console.log(AuthClientStub.name, "clearAccessToken", token);
  }
}
