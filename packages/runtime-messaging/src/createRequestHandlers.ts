import {FactsORM} from "@repo/facts-db";
import {RequestHandler} from "./RequestHandler";
import {Requests} from "./Requests";

type Handlers = {
  [M in keyof Requests]: RequestHandler<M>;
};

export function createRequestHandlers(db: FactsORM): Handlers {
  return {
    async addOne(payload, sendResponse) {
      await db.objects.addOne(payload);
      sendResponse();
    },
    async getOne(payload, sendResponse) {
      sendResponse(await db.objects.getOne(payload.id));
    },
    async getAll(_, sendResponse) {
      sendResponse(await db.objects.getAll());
    },
    async updateOne({id, note}, sendResponse) {
      await db.objects.updateOne(id, note);
      sendResponse();
    },
    async deleteOne(payload, sendResponse) {
      await db.objects.deleteOne(payload.id);
      sendResponse();
    },
    async filter(payload, sendResponse) {
      sendResponse(await db.objects.filter(payload));
    },
  };
}
