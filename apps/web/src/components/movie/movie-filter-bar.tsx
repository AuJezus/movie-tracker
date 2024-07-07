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
import { useQuery } from "@tanstack/react-query";
import { fetchMovieGenres } from "~/lib/movie-api/client";
import { useCallback } from "react";
import useFilterSearchParams from "~/lib/hooks/filter/use-filter-search-params";
import type { Filter, SortBy } from "~/lib/hooks/filter/types";
import { defaultFilters } from "~/lib/hooks/filter/config";

function MovieFilterContent() {
  const { setFilters } = useFilterSearchParams();

  const { data: genreRes } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => await fetchMovieGenres(),
  });

  const setFiltersFromTo = useCallback(
    (filter: "rating" | "runtime" | "released") => {
      return () =>
        setFilters(
          {
            filter: (filter + "From") as Filter,
            value:
              defaultFilters[(filter + "From") as keyof typeof defaultFilters],
          },
          {
            filter: (filter + "To") as Filter,
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
                {genreRes?.genres.map((genre) => (
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
            className="bg-transparent text-sm font-normal focus-visible:outline-none"
          />
        </label>
      </MenubarMenu>
    </Menubar>
  );
}

export default MovieFilterContent;
