import {app} from "./src/app";
import {connectDb} from "./src/connectDb";
import {env} from "./src/env";

await connectDb();

app
  .listen(env.PORT, () => {
    console.log(`Server running at PORT: ${env.PORT}`);
  })
  .on("error", error => {
    // gracefully handle error
    throw new Error(error.message);
  });
