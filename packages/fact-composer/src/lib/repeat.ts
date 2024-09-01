import {sleep} from "./sleep";

export const repeat = async (n: number, f: (i: number) => void): Promise<void> => {
  for (let i = 0; i < n; i++) {
    f(i);
    sleep(1000);
  }
}
