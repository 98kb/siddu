import {useEffect, useState} from "react";
import {SearchFact} from "./SearchFact";
import {useAtom} from "jotai";
import {queryAtom} from "../stores/queryAtom";
import {filterLabelsAtom} from "../stores/filterLabelsAtom";
import {FactListItem} from "../components/FactListItem";
import {Reader} from "fp-ts/lib/Reader";
import {FactSchema} from "@repo/collection-service-defs";
import {useCollection} from "~/pages/collection/hooks/useCollection";

type TProps = {
  onClick: Reader<FactSchema, void>;
};

export function FactList({onClick}: TProps) {
  const filteredFacts = useFactsQuery();
  return (
    <>
      <SearchFact />
      <div className="flex flex-col gap-2 w-full max-h-[485px] pb-10 overflow-y-scroll">
        {filteredFacts.map(fact => (
          <FactListItem
            key={fact._id}
            fact={fact}
            onClick={() => onClick(fact)}
          />
        ))}
      </div>
    </>
  );
}

function useFactsQuery() {
  const collection = useCollection();
  const [facts, setFacts] = useState<FactSchema[]>([]);
  const [query] = useAtom(queryAtom);
  const [labels] = useAtom(filterLabelsAtom);

  useEffect(() => {
    collection?.facts.list
      .query({
        pagination: {limit: 10, offset: 0},
        query,
        labelIds: labels.map(({_id}) => _id),
      })
      .then(setFacts);
  }, [collection, query, labels]);

  return facts;
}
