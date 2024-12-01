import {createContext} from "react";
import {BackupClient} from "@repo/collection-service-dexie-backup";

export const BackupContext = createContext<BackupClient | undefined>(undefined);
