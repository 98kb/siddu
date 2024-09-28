import type {Fact, Label} from "@repo/facts-db";

export function filterFactsByLabels(facts: Fact[], labels: Label[]) {
  if (labels.length === 0) {
    return facts;
  }
  const matchEveryFilterLabel = (factLabelIds: number[]) =>
    labels
      .map(({id}) => id)
      .every(filterLabelId => factLabelIds.includes(filterLabelId));
  return facts.filter(fact =>
    matchEveryFilterLabel(fact.labels.map(({id}) => id)),
  );
}
