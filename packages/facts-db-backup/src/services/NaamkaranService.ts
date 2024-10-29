export class NaamkaranService {
  constructor(readonly prefix: string) {}
  getName() {
    return `${this.prefix}.bkp`;
  }
}
