import { DiscoverFilter } from "api-contract";

export const sortByMap: Record<string, string> = {
  primary_release_date: "Release",
  vote_average: "Rating",
  title: "Title",
  popularity: "Popularity",
};

export const discoverFilters: DiscoverFilter[] = [
  "query",
  "genre",
  "order",
  "ratingFrom",
  "ratingTo",
  "releasedFrom",
  "releasedTo",
  "runtimeFrom",
  "runtimeTo",
  "sortBy",
];
