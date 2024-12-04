import {useAtomValue} from "jotai";
import {accessTokenAtom} from "../store/accessTokenAtom";

export function useAccessToken() {
  return useAtomValue(accessTokenAtom);
}
