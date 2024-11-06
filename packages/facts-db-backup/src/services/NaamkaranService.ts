export class NaamkaranService {
  getName(prefix: string) {
    return `${prefix}.${Date.now()}`;
  }
}
