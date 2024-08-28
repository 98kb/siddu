import {Note, db} from "@repo/notes-db";

type SearchQuery = {
  type: "search";
  query: string;
};

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener(
    (message: SearchQuery, sender, sendResponse) => {
      const filterNotes = (note: Note) => note.content.includes(message.query);
      db.notes
        .filter(note => filterNotes(note))
        .toArray()
        .then(notes => sendResponse(notes));
      return true;
    },
  );
});
