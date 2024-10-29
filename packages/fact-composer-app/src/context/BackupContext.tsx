import {createContext} from "react";
import {BackupClient} from "@repo/facts-db-backup";

export const BackupContext = createContext<BackupClient | undefined>(undefined);
