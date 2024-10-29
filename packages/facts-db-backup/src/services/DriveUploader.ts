import {DriveClient} from "./DriveClient";
import {UploadFileRequest} from "../types/UploadFileRequest";

export class DriveUploader {
  private readonly uploadUrl = "https://www.googleapis.com/upload/drive/v3";

  constructor(private readonly client: DriveClient) {}

  async upload(endpoint: string, request: UploadFileRequest): Promise<void> {
    const formData = this.toUploadFormData(request);
    await this.client.request(
      endpoint,
      {
        method: "POST",
        body: formData,
      },
      this.uploadUrl,
    );
  }

  private toUploadFormData(request: UploadFileRequest): FormData {
    const metadata = {
      name: request.name,
      parents: ["appDataFolder"],
    };
    const formData = new FormData();
    formData.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], {type: "application/json"}),
    );
    formData.append("file", request.content);
    return formData;
  }
}
