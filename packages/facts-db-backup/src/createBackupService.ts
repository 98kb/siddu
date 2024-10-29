import {BackupService} from "./services/BackupService";
import {type Dexie} from "dexie";
import {DriveAuth} from "./services/DriveAuth";
import {DriveClient} from "./services/DriveClient";
import {DriveUploader} from "./services/DriveUploader";
import {ExportImportService} from "./services/ExportImportService";
import {GoogleChromeAuth} from "@repo/chrome-auth-service";
import {GoogleDriveService} from "./services/GoogleDriveService";
import {NaamkaranService} from "./services/NaamkaranService";

// eslint-disable-next-line max-statements
export function createBackupService(db: Dexie): BackupService {
  const authProvider = new GoogleChromeAuth();
  const auth = new DriveAuth(authProvider);
  const client = new DriveClient(auth);
  const uploader = new DriveUploader(client);
  const drive = new GoogleDriveService(client, uploader);
  const exporter = new ExportImportService(db);
  const naamkaran = new NaamkaranService("facts-db-backup");
  return new BackupService(drive, exporter, naamkaran);
}
