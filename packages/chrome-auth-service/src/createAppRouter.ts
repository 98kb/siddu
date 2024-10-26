import {publicProcedure, router} from "./lib/trpc";
import {IAuthService} from "./services/IAuthService";

export const createAppRouter = (auth: IAuthService) =>
  router({
    getAccessToken: publicProcedure.query(() => auth.getAccessToken()),
  });
