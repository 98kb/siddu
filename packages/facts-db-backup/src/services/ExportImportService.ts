import {Fact, FactsDB, Label} from "@repo/facts-db";
import {exportDB, importInto} from "dexie-export-import";

// TODO: Encryption and compression
export class ExportImportService {
  constructor(private db: FactsDB) {}

  async export(): Promise<Blob> {
    return exportDB(this.db);
  }

  // TODO: cleanup import approach
  async import(data: Blob) {
    const dbData = await this.toDbData();

    return importInto(this.db, data, {
      overwriteValues: true,
      filter: (tableName: string, value: {id: number; updatedAt: number}) => {
        if (dbData[tableName]?.[value.id]) {
          const table = dbData[tableName];
          return !(table[value.id].updatedAt! > value.updatedAt);
        }
        return true;
      },
    });
  }

  private async toDbData(): Promise<
    Record<string, Record<number, {updatedAt?: number}>>
  > {
    const facts: Record<number, Fact> = {};
    const labels: Record<number, Label> = {};
    await this.db.facts.each($fact => (facts[$fact.id] = $fact));
    await this.db.labels.each($label => (labels[$label.id] = $label));
    return {facts, labels};
  }
}
