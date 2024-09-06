import {ORM, TableObjects} from "@repo/facts-db";
import {RequestHandler} from "./RequestHandler";
import {Requests} from "./Requests";

type Handlers<T extends keyof TableObjects> = {
  [M in keyof Requests<T>]: RequestHandler<T, M>;
};

export function createRequestHandlers<T extends keyof TableObjects>(
  db: ORM<T>,
): Handlers<T> {
  return {
    async addOne(payload, sendResponse) {
      sendResponse(await db.objects.addOne(payload));
    },
    async getOne(payload, sendResponse) {
      sendResponse(await db.objects.getOne(payload.id));
    },
    async getAll(_, sendResponse) {
      sendResponse(await db.objects.getAll());
    },
    async updateOne({id, obj}, sendResponse) {
      sendResponse(await db.objects.updateOne(id, obj));
    },
    async deleteOne(payload, sendResponse) {
      sendResponse(await db.objects.deleteOne(payload.id));
    },
    async deleteAll(_, sendResponse) {
      sendResponse(await db.objects.deleteAll());
    },
    async filter({predicate}, sendResponse) {
      sendResponse(await db.objects.filter(predicate));
    },
  };
}
