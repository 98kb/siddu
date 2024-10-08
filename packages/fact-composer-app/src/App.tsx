import "./index.css";
import {createMemoryAdapter, DbClient} from "@repo/facts-db";
import {Textarea} from "./components/ui/textarea";
import {Composer} from "./composer/Composer";
import {seedDb} from "./_mock/seedDb";

const db = new DbClient(createMemoryAdapter);
seedDb(db);
export default function App() {
  return (
    <>
      <Textarea />
      <Composer db={db} />
    </>
  );
}
