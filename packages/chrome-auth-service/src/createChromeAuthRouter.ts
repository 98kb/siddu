import {AccessTokenRequest} from "./dto/AccessTokenRequest";
import {IAuthService} from "./services/IAuthService";
import {publicProcedure, router} from "./lib/trpc";

export const createChromeAuthRouter = (auth: IAuthService) =>
  router({
    getAccessToken: publicProcedure
      .input(AccessTokenRequest)
      .query(({input}) => auth.getAccessToken(input.scopes)),
  });
