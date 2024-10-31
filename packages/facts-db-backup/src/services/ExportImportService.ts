import {type Dexie} from "dexie";
import {exportDB, importInto} from "dexie-export-import";

/**
 * TODO: Encryption and compression
 */
export class ExportImportService {
  constructor(private db: Dexie) {}

  async export(): Promise<Blob> {
    return exportDB(this.db);
  }

  async import(data: Blob) {
    return importInto(this.db, data, {
      overwriteValues: true,
    });
  }
}
