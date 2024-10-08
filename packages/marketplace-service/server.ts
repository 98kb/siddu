import {app} from "./src/app";
import {env} from "./src/env";

app
  .listen(env.PORT, () => {
    console.log(`Server running at PORT: ${env.PORT}`);
  })
  .on("error", error => {
    // gracefully handle error
    throw new Error(error.message);
  });
