import {publicProcedure, router} from "./lib/trpc";
import {z} from "zod";

export const createAppRouter = () =>
  router({
    getUser: publicProcedure.input(z.string()).query(opts => {
      return {id: opts.input, name: "Bilbo"};
    }),
  });
