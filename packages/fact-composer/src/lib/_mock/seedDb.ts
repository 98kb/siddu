import type {DbClient, InsertFact, InsertLabel} from "@repo/facts-db";

export const seedDb = (db: DbClient) => {
  const labels: InsertLabel[] = [
    {name: "ChatGPT"},
    {name: "OpenAI"},
    {name: "WorkExp"},
    {name: "Education"},
    {name: "Projects"},
    {name: "Skills"},
  ];

  const facts: InsertFact[] = [
    {
      content: "The quick brown fox jumps over the lazy dog",
      labels: [],
    },
    {
      content: "Started from the bottom now we're here",
      labels: [],
    },
    {
      content:
        "This is a really long paragraph generated by Code Pilot. It's a great tool for generating random text. All you have to do is type 'lorem' followed by the number of words you want to generate. For example, 'lorem 10' will generate a 10-word paragraph of lorem ipsum text. You can also generate a paragraph of random text by typing 'random' followed by the number of words you want to generate. For example, 'random 10' will generate a 10-word paragraph of random text. Code Pilot is a great tool for generating random text. It's easy to use and it's free!",
      labels: [],
    },
  ];

  for (const label of labels) {
    db.labels.add(label);
  }

  for (const fact of facts) {
    db.facts.add(fact);
  }
};
