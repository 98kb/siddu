import {UploadFileRequest} from "./UploadFileRequest";

export interface IDriveService {
  toFileId(fileName: string): Promise<string | undefined>;
  uploadFile(request: UploadFileRequest): Promise<void>;
  downloadFile(fileId: string): Promise<Blob>;
}
