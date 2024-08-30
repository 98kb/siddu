import {Fact, db} from "@repo/facts-db";

type Message =
  | {
      type: "search";
      query: string;
    }
  | {
      type: "getAll";
    };
type Handler = (message: Message, sendResponse: (r: any) => any) => void;

const handlers: Record<Message["type"], Handler> = {
  getAll: (_, sendResponse) => {
    db.notes.toArray().then(notes => sendResponse(notes));
  },
  search: (message, sendResponse) => {
    const filterNotes = (note: Fact) => note.content.includes(message.query);
    db.notes
      .filter(note => filterNotes(note))
      .toArray()
      .then(notes => sendResponse(notes));
  },
};

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener(
    (message: Message, sender, sendResponse) => {
      handlers[message.type]?.(message, sendResponse);
      return true;
    },
  );
});
