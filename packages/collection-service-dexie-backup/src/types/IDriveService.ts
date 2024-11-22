import {type FileSchema} from "../dto/FileSchema";
import {UploadFileRequest} from "./UploadFileRequest";

export interface IDriveService {
  modifyFile(fileId: string, request: UploadFileRequest): Promise<void>;
  uploadFile(request: UploadFileRequest): Promise<void>;
  listFiles(options: {query?: string}): Promise<FileSchema[]>;
  downloadFile(fileId: string): Promise<Blob>;

  deleteFile(fileId: string): Promise<void>;
}
