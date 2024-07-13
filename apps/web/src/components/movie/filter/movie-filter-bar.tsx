"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "~/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import { LucideChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import useFilterSearchParams from "~/lib/hooks/filter/use-filter-search-params";
import { queryApiClient } from "~/lib/api";
import { DiscoverFilter, SortBy } from "api-contract";
import { useMediaQuery } from "~/lib/hooks/use-media-query";

export const defaultFilters = {
  ratingFrom: "5",
  ratingTo: "10",
  runtimeFrom: "30",
  runtimeTo: "240",
  releasedFrom: new Date(2000, 0).toISOString().split("T")[0]!,
  releasedTo: new Date().toISOString().split("T")[0]!,
};

function MovieFilterBar() {
  const { setFilters, filters } = useFilterSearchParams();
  const [query, setQuery] = useState("");

  const { data: genreRes } = queryApiClient.movies.getGenres.useQuery([
    "genres",
  ]);

  const isSmall = useMediaQuery("(max-width: 400px)");

  const setFiltersFromTo = useCallback(
    (filter: "rating" | "runtime" | "released") => {
      return () =>
        setFilters(
          {
            filter: (filter + "From") as DiscoverFilter,
            value:
              defaultFilters[(filter + "From") as keyof typeof defaultFilters],
          },
          {
            filter: (filter + "To") as DiscoverFilter,
            value:
              defaultFilters[(filter + "To") as keyof typeof defaultFilters],
          },
        );
    },
    [setFilters],
  );

  const setSortFilter = useCallback(
    (by: SortBy, order: "desc" | "asc") => {
      return () =>
        setFilters(
          { filter: "sortBy", value: by },
          { filter: "order", value: order },
        );
    },
    [setFilters],
  );

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setFilters({ filter: "query", value: query }),
      500,
    );
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <Menubar className="mb-2 flex h-fit w-fit flex-wrap border-2">
      <MenubarMenu>
        <MenubarTrigger>Filter</MenubarTrigger>
        <MenubarContent>
          <MenubarItem asChild>
            <Select
              onValueChange={(genre) =>
                setFilters({ filter: "genre", value: genre })
              }
            >
              <SelectTrigger
                icon={<LucideChevronRight className="h-4 w-4" />}
                className="h-auto border-none px-2 py-1.5 hover:bg-accent hover:text-accent-foreground focus:ring-0"
              >
                Genre
              </SelectTrigger>
              <SelectContent side="right">
                {genreRes?.body.genres.map((genre) => (
                  <SelectItem
                    key={genre.id}
                    value={String(genre.id)}
                    className="capitalize"
                  >
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </MenubarItem>

          <MenubarItem onClick={setFiltersFromTo("rating")}>Rating</MenubarItem>

          <MenubarItem onClick={setFiltersFromTo("runtime")}>
            Runtime
          </MenubarItem>

          <MenubarItem onClick={setFiltersFromTo("released")}>
            Release date
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Sort</MenubarTrigger>
        <MenubarContent>
          {isSmall ? (
            <MenubarItem
              onClick={setSortFilter("primary_release_date", "desc")}
            >
              Release date
            </MenubarItem>
          ) : (
            <MenubarSub>
              <MenubarSubTrigger>Release date</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={setSortFilter("primary_release_date", "asc")}
                >
                  Ascending
                </MenubarItem>
                <MenubarItem
                  onClick={setSortFilter("primary_release_date", "desc")}
                >
                  Descending
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          )}

          {isSmall ? (
            <MenubarItem onClick={setSortFilter("vote_average", "desc")}>
              Rating
            </MenubarItem>
          ) : (
            <MenubarSub>
              <MenubarSubTrigger>Rating</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={setSortFilter("vote_average", "asc")}>
                  Ascending
                </MenubarItem>
                <MenubarItem onClick={setSortFilter("vote_average", "desc")}>
                  Descending
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          )}

          {isSmall ? (
            <MenubarItem onClick={setSortFilter("title", "desc")}>
              Title
            </MenubarItem>
          ) : (
            <MenubarSub>
              <MenubarSubTrigger>Title</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={setSortFilter("title", "asc")}>
                  Ascending
                </MenubarItem>
                <MenubarItem onClick={setSortFilter("title", "desc")}>
                  Descending
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          )}

          {isSmall ? (
            <MenubarItem onClick={setSortFilter("popularity", "desc")}>
              Popularity
            </MenubarItem>
          ) : (
            <MenubarSub>
              <MenubarSubTrigger>Popularity</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={setSortFilter("popularity", "asc")}>
                  Ascending
                </MenubarItem>
                <MenubarItem onClick={setSortFilter("popularity", "desc")}>
                  Descending
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          )}
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <label
          htmlFor="search"
          className="group !ml-0 flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium focus-within:bg-accent hover:bg-accent sm:!ml-2"
        >
          Search:
          <input
            id="search"
            placeholder="..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-transparent text-sm font-normal focus-visible:outline-none"
          />
        </label>
      </MenubarMenu>
    </Menubar>
  );
}

export default MovieFilterBar;
