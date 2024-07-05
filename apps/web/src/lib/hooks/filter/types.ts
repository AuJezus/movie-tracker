import type { filterTypes } from "./config";

export type Filter = (typeof filterTypes)[number];

export type SortBy =
  | "primary_release_date"
  | "vote_average"
  | "title"
  | "popularity";

export type Filters = {
  genre: string[];
  ratingFrom?: string;
  ratingTo?: string;
  runtimeFrom?: string;
  runtimeTo?: string;
  releasedFrom?: string;
  releasedTo?: string;
  sortBy?: string;
  order?: string;
};
