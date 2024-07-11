import { Review } from "database";

export type SortBy =
  | "primary_release_date"
  | "vote_average"
  | "title"
  | "popularity";

export interface DiscoverFilters {
  genre?: string[];
  ratingFrom?: string;
  ratingTo?: string;
  runtimeFrom?: string;
  runtimeTo?: string;
  releasedFrom?: string;
  releasedTo?: string;
  sortBy?: SortBy;
  order?: "asc" | "desc";
}

export type DiscoverFilter = keyof DiscoverFilters;

export interface GenreResponse {
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetailsResponse {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieList {
  typeId: number;
  name: string;
  movies: DiscoverMovie[];
}

export type DiscoverMovie = MovieDetailsResponse & {
  list?: { listMovieId: number; typeId: number };
};

export interface DiscoverMovieResponse {
  page: number;
  results: DiscoverMovie[];
  total_pages: number;
  total_results: number;
}

export type ReviewResponse = Review & { movie: MovieDetailsResponse };

export interface ImageInfo {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
}
