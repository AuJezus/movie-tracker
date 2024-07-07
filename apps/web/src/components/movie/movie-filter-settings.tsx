"use client";

import { BiCalendar, BiX } from "react-icons/bi";
import useFilterSearchParams from "~/lib/hooks/filter/use-filter-search-params";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { sortByMap } from "~/lib/hooks/filter/config";
import { queryApiClient } from "~/lib/api";
import { type DiscoverFilter } from "api-contract";

import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

function MovieFilterSettings() {
  const { filters, removeFilters } = useFilterSearchParams();

  const { data: genreRes } = queryApiClient.movies.getGenres.useQuery([
    "genres",
  ]);

  const genres = genreRes?.body.genres;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {!!genres?.length && (
        <>
          {filters.genre?.map((genre) => (
            <div
              key={genre}
              className="flex cursor-pointer items-center gap-1 rounded-sm bg-primary px-2 py-1 text-sm text-primary-foreground"
              onClick={() => removeFilters({ filter: "genre", value: genre })}
            >
              {genres.find((g) => +genre === g.id)?.name}
              <BiX />
            </div>
          ))}
        </>
      )}

      {!!filters.ratingFrom && (
        <InputFilter
          label="Rating from"
          filter="ratingFrom"
          type="number"
          min={0}
          max={filters.ratingTo ?? 10}
        />
      )}

      {!!filters.ratingTo && (
        <InputFilter
          label="Rating to"
          filter="ratingTo"
          type="number"
          min={filters.ratingFrom ?? 0}
          max={10}
        />
      )}

      {!!filters.runtimeFrom && (
        <InputFilter
          label="Runtime from (mins)"
          filter="runtimeFrom"
          type="number"
          min={0}
          max={filters.runtimeTo ?? undefined}
          className="w-10"
        />
      )}

      {!!filters.runtimeTo && (
        <InputFilter
          label="Runtime to (mins)"
          filter="runtimeTo"
          type="number"
          min={filters.runtimeTo ?? 0}
          className="w-10"
        />
      )}

      {!!filters.releasedFrom && (
        <InputFilter
          label="Released from"
          filter="releasedFrom"
          type="date"
          min={filters.releasedFrom ?? 0}
          className="w-10"
        />
      )}

      {!!filters.releasedTo && (
        <InputFilter
          label="Released to"
          filter="releasedTo"
          type="date"
          min={filters.releasedTo ?? 0}
          className="w-10"
        />
      )}

      {!!filters.sortBy && !!filters.order && (
        <div className="flex cursor-pointer items-center gap-1 rounded-sm bg-secondary px-2 py-1 text-sm text-secondary-foreground">
          {`${sortByMap[filters.sortBy] ?? filters.sortBy} ${filters.order.toUpperCase()}`}{" "}
          <BiX
            onClick={() =>
              removeFilters({ filter: "sortBy" }, { filter: "order" })
            }
            className="cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

function InputFilter({
  label,
  filter,
  className,
  ...props
}: {
  label: string;
  filter: Exclude<DiscoverFilter, "genre">;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { filters, setFilters, removeFilters } = useFilterSearchParams();
  return (
    <div className="flex cursor-pointer items-center gap-1 rounded-sm bg-primary px-2 py-1 text-sm text-primary-foreground">
      <label>{label}:</label>
      {props.type === "date" && (
        <Popover>
          <PopoverTrigger className="flex items-center gap-1">
            <BiCalendar />
            {format(new Date(filters[filter] ?? Date.now()), "yyyy-MM-dd")}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={new Date(filters[filter]!)}
              onSelect={(e) =>
                setFilters({ filter, value: e!.toISOString().split("T")[0]! })
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )}

      {props.type !== "date" && (
        <input
          {...props}
          onBlur={(e) =>
            setFilters({
              filter,
              value: e.target.value,
            })
          }
          defaultValue={filters[filter]}
          className={cn(
            "w-10 bg-primary text-center",
            props.type === "number" && "arrow-hide",
            className,
          )}
        />
      )}

      <BiX
        onClick={() => removeFilters({ filter })}
        className="cursor-pointer"
      />
    </div>
  );
}

export default MovieFilterSettings;
