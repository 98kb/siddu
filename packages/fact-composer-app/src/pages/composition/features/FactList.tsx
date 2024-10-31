import {useEffect, useState} from "react";
import {SearchFact} from "./SearchFact";
import {useAtom} from "jotai";
import {Fact} from "@repo/facts-db";
import {queryAtom} from "../stores/queryAtom";
import {filterLabelsAtom} from "../stores/filterLabelsAtom";
import {useFactsDb} from "~/db/hooks/useFactsDb";
import {FactListItem} from "../components/FactListItem";
import {Reader} from "fp-ts/lib/Reader";

type TProps = {
  onClick: Reader<Fact, void>;
};

export function FactList({onClick}: TProps) {
  const filteredFacts = useFacts();
  return (
    <>
      <SearchFact />
      <div className="flex flex-col gap-2 w-full max-h-[485px] pb-10 overflow-y-scroll">
        {filteredFacts.map(fact => (
          <FactListItem
            key={fact.id}
            fact={fact}
            onClick={() => onClick(fact)}
          />
        ))}
      </div>
    </>
  );
}

function useFacts() {
  const db = useFactsDb();
  const [facts, setFacts] = useState<Fact[]>([]);
  const [query] = useAtom(queryAtom);
  const [labels] = useAtom(filterLabelsAtom);

  useEffect(() => {
    db?.facts.filter({query, labels}).then(setFacts);
  }, [db, query, labels]);

  return facts;
}
