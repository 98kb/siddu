import {AccessTokenRequest} from "./dto/AccessTokenRequest";
import {ClearAccessTokenRequest} from "./dto/ClearAccessTokenRequest";
import {IAuthService} from "./services/IAuthService";
import {publicProcedure, router} from "./lib/trpc";

export const createChromeAuthRouter = (auth: IAuthService) =>
  router({
    getAccessToken: publicProcedure
      .input(AccessTokenRequest)
      .query(({input}) => auth.getAccessToken(input)),
    clearAccessToken: publicProcedure
      .input(ClearAccessTokenRequest)
      .mutation(({input}) => auth.clearAccessToken(input)),
  });
