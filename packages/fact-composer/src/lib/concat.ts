export const concat = (separator: string) => (...strings: string[]) => (
  strings.filter(Boolean).join(separator)
);
