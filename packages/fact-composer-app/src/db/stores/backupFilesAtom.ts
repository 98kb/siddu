import {atom} from "jotai";
import {type FileSchema} from "@repo/facts-db-backup";

export const backupFilesAtom = atom<FileSchema[]>([]);
