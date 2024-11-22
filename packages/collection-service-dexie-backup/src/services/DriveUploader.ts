import {DriveClient} from "./DriveClient";
import {UploadFileRequest} from "../types/UploadFileRequest";

export class DriveUploader {
  private readonly uploadUrl = "https://www.googleapis.com/upload/drive/v3";

  constructor(private readonly client: DriveClient) {}

  async upload(request: UploadFileRequest): Promise<void> {
    const payload = this.toFormData(request.content, {
      name: request.name,
      parents: ["appDataFolder"],
    });
    await this.requestUpload("/files?uploadType=multipart", "POST", payload);
  }

  async modify(fileId: string, request: UploadFileRequest): Promise<void> {
    const payload = this.toFormData(request.content, {
      name: request.name,
    });
    await this.requestUpload(
      `/files/${fileId}?uploadType=multipart`,
      "PATCH",
      payload,
    );
  }

  private async requestUpload(
    endpoint: string,
    method: string,
    payload: FormData,
  ): Promise<void> {
    await this.client.request(
      endpoint,
      {
        method,
        body: payload,
      },
      this.uploadUrl,
    );
  }

  private toFormData(content: Blob, metadata: Record<string, any>): FormData {
    const formData = new FormData();
    formData.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], {type: "application/json"}),
    );
    formData.append("file", content);
    return formData;
  }
}
