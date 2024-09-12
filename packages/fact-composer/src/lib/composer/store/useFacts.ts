import {readable} from "svelte/store";
import type {Fact} from "@repo/facts-db";
import type {FactsService} from "@repo/facts-service";

export const useFacts = (db: FactsService) =>
  readable<Fact[]>([], set => {
    const fetchFacts = async () => set(await db.facts.getAll());
    fetchFacts();
    db.facts.onMutation(fetchFacts);
  });
