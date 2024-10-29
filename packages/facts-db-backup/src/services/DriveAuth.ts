import {type IAuthService} from "@repo/chrome-auth-service";

export class DriveAuth {
  constructor(private authProvider: IAuthService) {}

  toAccessToken(): Promise<string | undefined> {
    return this.authProvider.getAccessToken({
      scopes: [
        "https://www.googleapis.com/auth/drive.appdata",
        "https://www.googleapis.com/auth/drive.appfolder",
      ],
    });
  }
}
