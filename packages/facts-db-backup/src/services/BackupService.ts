import {ExportImportService} from "./ExportImportService";
import {IDriveService} from "../types/IDriveService";
import {NaamkaranService} from "./NaamkaranService";

// TODO: Add locking mechanism to prevent concurrent backups
export class BackupService {
  constructor(
    private readonly drive: IDriveService,
    private readonly dbExportService: ExportImportService,
    private readonly nameService: NaamkaranService,
  ) {}

  async backup() {
    const dbBlob = await this.dbExportService.export();
    const backupName = this.nameService.getName();
    await this.drive.uploadFile({name: backupName, content: dbBlob});
  }

  async restore() {
    const backupName = this.nameService.getName();
    const backupId = await this.drive.toFileId(backupName);
    if (backupId) {
      const dbBlob = await this.drive.downloadFile(backupId);
      return this.dbExportService.import(dbBlob);
    }
    throw new Error("No backup found");
  }
}
