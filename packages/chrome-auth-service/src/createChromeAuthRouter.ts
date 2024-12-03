import {ClearAccessTokenRequest} from "./dto/ClearAccessTokenRequest";
import {IAuthService} from "./services/IAuthService";
import {publicProcedure, router} from "./lib/trpc";

export const createChromeAuthRouter = (auth: IAuthService) =>
  router({
    getAccessToken: publicProcedure.query(() => auth.getAccessToken()),
    clearAccessToken: publicProcedure
      .input(ClearAccessTokenRequest)
      .mutation(({input}) => auth.clearAccessToken(input)),
  });
