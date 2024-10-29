import {DriveAuth} from "./DriveAuth";

export class DriveClient {
  readonly apiUrl = "https://www.googleapis.com/drive/v3";

  constructor(private auth: DriveAuth) {}

  async fetch<T = any>(endpoint: string, options: RequestInit): Promise<T> {
    const response = await this.request(endpoint, options);
    return response.json();
  }

  async request(
    endpoint: string,
    options: RequestInit,
    apiUrl?: string,
  ): Promise<Response> {
    const response = await fetch(`${apiUrl ?? this.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${await this.auth.toAccessToken()}`,
      },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }
    return response;
  }
}
