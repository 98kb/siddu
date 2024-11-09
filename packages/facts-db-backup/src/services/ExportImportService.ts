import {BaseSchema, Fact, FactsDB, Label} from "@repo/facts-db";
import {exportDB, importInto} from "dexie-export-import";
import {z} from "zod";

type BaseSchema = z.infer<typeof BaseSchema>;

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
      filter: (tableName: string, value: BaseSchema) => {
        if (dbData[tableName]?.[value.id]) {
          const table = dbData[tableName];
          return !(table[value.id].updatedAt! > value.updatedAt!);
        }
        return true;
      },
      transform: (tableName: string, value: BaseSchema, key: any) => {
        // if a record is soft deleted either locally or remotely then soft delete it locally
        // because we don't want to resurrect a deleted record
        const isDeleted =
          dbData[tableName]?.[value.id]?.isDeleted || value.isDeleted;
        return {value: {...value, isDeleted}, key};
      },
    });
  }

  private async toDbData(): Promise<
    Record<string, Record<number, BaseSchema>>
  > {
    const facts: Record<number, Fact> = {};
    const labels: Record<number, Label> = {};
    await this.db.facts.each($fact => (facts[$fact.id] = $fact));
    await this.db.labels.each($label => (labels[$label.id] = $label));
    return {facts, labels};
  }
}
