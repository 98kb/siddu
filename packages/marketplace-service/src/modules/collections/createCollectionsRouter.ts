import {CollectionService} from "./services/CollectionService";
import {LimitOffsetDto} from "../../common/dto/LimitOffsetDto";
import {ListFactsInputDto} from "./dto/ListFactsInputDto";
import {publicProcedure} from "@repo/facts-db";
import {router} from "../../lib/trpc";
import {z} from "zod";

const collections = new CollectionService();

export const createCollectionsRouter = () =>
  router({
    list: publicProcedure
      .input(LimitOffsetDto)
      .query(({input}) => collections.list(input)),

    get: publicProcedure
      .input(z.string())
      .query(({input}) => collections.get(input)),

    listFacts: publicProcedure
      .input(ListFactsInputDto)
      .query(({input}) => collections.listFacts(input)),
  });
