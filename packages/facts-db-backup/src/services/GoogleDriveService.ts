import {DriveClient} from "./DriveClient";
import {DriveUploader} from "./DriveUploader";
import {type FileSchema} from "../dto/FileSchema";
import {IDriveService} from "../types/IDriveService";
import {UploadFileRequest} from "../types/UploadFileRequest";

export class GoogleDriveService implements IDriveService {
  constructor(
    private readonly drive: DriveClient,
    private readonly uploader: DriveUploader,
  ) {}

  async deleteFile(fileId: string): Promise<void> {
    await this.drive.request(`/files/${fileId}`, {
      method: "DELETE",
    });
  }

  async listFiles({query}: {query?: string}): Promise<FileSchema[]> {
    const fullQuery = query ? `name contains '${query}' and ` : "";
    const response = await this.drive.fetch(
      `/files?q=${fullQuery}+'appDataFolder'+in+parents&spaces=appDataFolder`,
      {method: "GET"},
    );
    return response.files ?? [];
  }

  async uploadFile(request: UploadFileRequest): Promise<void> {
    await this.uploader.upload("/files?uploadType=multipart", request);
  }

  async downloadFile(fileId: string): Promise<Blob> {
    const response = await this.drive.request(`/files/${fileId}?alt=media`, {
      method: "GET",
    });
    return await response.blob();
  }
}
