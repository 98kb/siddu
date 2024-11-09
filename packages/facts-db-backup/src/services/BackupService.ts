import {ExportImportService} from "./ExportImportService";
import {type FileSchema} from "../dto/FileSchema";
import {IDriveService} from "../types/IDriveService";
import {NaamkaranService} from "./NaamkaranService";
import {UploadFileRequest} from "../types/UploadFileRequest";

// TODO: Add locking mechanism to prevent concurrent backups
export class BackupService {
  private readonly backupPrefix = "facts-db-backup";

  constructor(
    private readonly drive: IDriveService,
    private readonly dbExportService: ExportImportService,
    private readonly naamkaran: NaamkaranService,
  ) {}

  async backup(): Promise<void> {
    const dbBlob = await this.dbExportService.export();
    const uploadRequest = this.toUploadRequest(dbBlob);
    const [backupFile] = await this.fetchBackupFiles();
    backupFile
      ? await this.drive.modifyFile(backupFile.id, uploadRequest)
      : await this.drive.uploadFile(uploadRequest);
  }

  fetchBackupFiles(): Promise<FileSchema[]> {
    return this.drive.listFiles({query: this.backupPrefix});
  }

  async restore(backup: FileSchema): Promise<void> {
    const dbBlob = await this.drive.downloadFile(backup.id);
    return this.dbExportService.import(dbBlob);
  }

  async deleteBackup(backup: FileSchema): Promise<void> {
    return this.drive.deleteFile(backup.id);
  }

  private toUploadRequest(dbBlob: Blob): UploadFileRequest {
    return {
      name: this.naamkaran.getName(this.backupPrefix),
      content: dbBlob,
    };
  }
}
