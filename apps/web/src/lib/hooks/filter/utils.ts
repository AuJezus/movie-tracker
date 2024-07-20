import { DiscoverFilter, DiscoverFilters, SortBy } from "api-contract";
import { discoverFilters } from "./config";

export function isDiscoverFilter(key: string): key is DiscoverFilter {
  return discoverFilters.includes(key as keyof DiscoverFilters);
}

export function getFiltersFromParams(params: URLSearchParams) {
  const paramFilters: DiscoverFilters = {};

  for (const [filter, value] of params.entries()) {
    if (isDiscoverFilter(filter)) {
      if (filter === "genre")
        paramFilters[filter] = Array.isArray(paramFilters[filter])
          ? [...paramFilters[filter], value]
          : [value];
      else if (filter === "sortBy" || filter === "order") {
        if (filter === "sortBy") paramFilters[filter] = value as SortBy;
        else if (filter === "order")
          paramFilters[filter] = value as "asc" | "desc";
      } else paramFilters[filter] = value;
    }
  }

  return paramFilters;
}
