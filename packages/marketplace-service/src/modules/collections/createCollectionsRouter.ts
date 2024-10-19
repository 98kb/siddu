import {CollectionSchema} from "./schemas/CollectionSchema";
import {CollectionService} from "./services/CollectionService";
import {FactSchema} from "./schemas/FactSchema";
import {LimitOffsetDto} from "../../common/dto/LimitOffsetDto";
import {ListFactsInputDto} from "./dto/ListFactsInputDto";
import {ObjectId} from "mongodb";
import {publicProcedure} from "@repo/facts-db";
import {router} from "../../lib/trpc";
import {z} from "zod";

const collections = new CollectionService();

export const createCollectionsRouter = () =>
  router({
    list: publicProcedure
      .input(LimitOffsetDto)
      .output(z.array(CollectionSchema))
      .query(({input}) => collections.list(input)),

    get: publicProcedure
      .input(z.string().refine(ObjectId.isValid, {message: "Invalid ObjectId"}))
      .output(CollectionSchema.nullish())
      .query(({input}) => collections.get(input.toString())),

    listFacts: publicProcedure
      .input(ListFactsInputDto)
      .output(z.array(FactSchema))
      .query(({input}) => collections.listFacts(input)),
  });
