interface O {
  id: string;
}

export interface DAO<T extends O> {
  add(note: Omit<T, "id">): Promise<void>;
  getAll(): Promise<T[]>;
  search(query: string): Promise<T[]>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<void>;
}
