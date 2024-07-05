export const filterTypes = [
  "genre",
  "ratingFrom",
  "ratingTo",
  "runtimeFrom",
  "runtimeTo",
  "releasedFrom",
  "releasedTo",
  "sortBy",
  "order",
] as const;

export const defaultFilters = {
  ratingFrom: "5",
  ratingTo: "10",
  runtimeFrom: "30",
  runtimeTo: "240",
  releasedFrom: new Date(2000, 0).toISOString().split("T")[0]!,
  releasedTo: new Date().toISOString().split("T")[0]!,
};

export const filterMap = {
  genre: "with_genres",
  ratingFrom: "vote_average.gte",
  ratingTo: "vote_average.lte",
  runtimeFrom: "with_runtime.gte",
  runtimeTo: "with_runtime.lte",
  releasedFrom: "primary_release_date.gte",
  releasedTo: "primary_release_date.lte",
  sortBy: "sort_by",
};
