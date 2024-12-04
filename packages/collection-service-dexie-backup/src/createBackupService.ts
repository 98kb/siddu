import {BackupService} from "./services/BackupService";
import {CollectionDB} from "@repo/collection-service-helpers-dexie";
import {DriveClient} from "./services/DriveClient";
import {DriveUploader} from "./services/DriveUploader";
import {ExportImportService} from "./services/ExportImportService";
import {GoogleDriveService} from "./services/GoogleDriveService";
import {type IAuthService} from "@repo/chrome-auth-service";
import {NaamkaranService} from "./services/NaamkaranService";

export function createBackupService(
  db: CollectionDB,
  auth: IAuthService,
): BackupService {
  const client = new DriveClient(auth);
  const uploader = new DriveUploader(client);
  const drive = new GoogleDriveService(client, uploader);
  const exporter = new ExportImportService(db);
  const naamkaran = new NaamkaranService();
  return new BackupService(drive, exporter, naamkaran);
}
