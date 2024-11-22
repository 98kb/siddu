import {CollectionDB} from "@repo/collection-service-helpers-dexie";
import {exportDB, importInto} from "dexie-export-import";
import type {
  BaseSchema,
  FactSchema,
  LabelSchema,
} from "@repo/collection-service-defs";

// TODO: Encryption and compression
export class ExportImportService {
  constructor(private db: CollectionDB) {}

  async export(): Promise<Blob> {
    return exportDB(this.db);
  }

  // TODO: cleanup import approach
  async import(data: Blob) {
    const dbData = await this.toDbData();

    return importInto(this.db, data, {
      overwriteValues: true,
      filter: (tableName: string, value: BaseSchema) => {
        if (dbData[tableName]?.[value._id]) {
          const table = dbData[tableName];
          return !(table[value._id].updatedAt! > value.updatedAt!);
        }
        return true;
      },
      transform: (tableName: string, value: BaseSchema, key: any) => {
        // if a record is soft deleted either locally or remotely then soft delete it locally
        // because we don't want to resurrect a deleted record
        const isDeleted =
          dbData[tableName]?.[value._id]?.isDeleted || value.isDeleted;
        return {value: {...value, isDeleted}, key};
      },
    });
  }

  private async toDbData(): Promise<
    Record<string, Record<BaseSchema["_id"], BaseSchema>>
  > {
    const facts: Record<BaseSchema["_id"], FactSchema> = {};
    const labels: Record<BaseSchema["_id"], LabelSchema> = {};
    await this.db.facts.each($fact => (facts[$fact._id] = $fact));
    await this.db.labels.each($label => (labels[$label._id] = $label));
    return {facts, labels};
  }
}
