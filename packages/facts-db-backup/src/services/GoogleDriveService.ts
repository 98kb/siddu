import {DriveClient} from "./DriveClient";
import {IDriveService} from "../types/IDriveService";
import {UploadFileRequest} from "../types/UploadFileRequest";
import {DriveUploader} from "./DriveUploader";

export class GoogleDriveService implements IDriveService {
  constructor(
    private readonly drive: DriveClient,
    private readonly uploader: DriveUploader,
  ) {}

  async toFileId(fileName: string): Promise<string | undefined> {
    const response = await this.drive.fetch(
      `/files?q=name='${fileName}'+and+'appDataFolder'+in+parents&spaces=appDataFolder`,
      {method: "GET"},
    );
    return response.files?.[0]?.id;
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
