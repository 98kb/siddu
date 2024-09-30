import {Location} from "react-router-dom";

export function toEndpoint(location: Location) {
  return `${location.pathname}${location.search}${location.hash}`;
}
