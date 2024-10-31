import {AccessTokenRequest} from "./dto/AccessTokenRequest";
import {ChromeAuthRouter} from "./ChromeAuthRouter";
import {ClearAccessTokenRequest} from "./dto/ClearAccessTokenRequest";
import {IAuthService} from "./services/IAuthService";
import {createTRPCProxyClient} from "@trpc/client";

type AuthProvider = ReturnType<typeof createTRPCProxyClient<ChromeAuthRouter>>;

export class AuthClient implements IAuthService {
  constructor(private readonly authProvider: AuthProvider) {}

  async getAccessToken(
    request: AccessTokenRequest,
  ): Promise<string | undefined> {
    return this.authProvider.getAccessToken.query(request);
  }

  async clearAccessToken(request: ClearAccessTokenRequest): Promise<void> {
    return this.authProvider.clearAccessToken.mutate(request);
  }
}
