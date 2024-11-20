import {useContext} from "react";
import {CollectionContext} from "../context/CollectionContext";

export function useCollection() {
  const client = useContext(CollectionContext);
  return client;
}
