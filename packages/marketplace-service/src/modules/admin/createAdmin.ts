// eslint-disable-next-line import/no-named-as-default
import AdminJS, {AdminJSOptions} from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import {Collection} from "../collections/models/Collection";

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const adminOptions: AdminJSOptions = {
  resources: [Collection],
};

export function createAdmin(app: express.Express) {
  const admin = new AdminJS(adminOptions);

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);
  console.log(`admin: ${admin.options.rootPath}`);
}
