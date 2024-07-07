"use client";

import { useQuery } from "@tanstack/react-query";
import { BiCalendar, BiX } from "react-icons/bi";
import type { Filter } from "~/lib/hooks/filter/types";
import useFilterSearchParams from "~/lib/hooks/filter/use-filter-search-params";
import { fetchMovieGenres } from "~/lib/movie-api/client";
import { cn } from "~/lib/utils";

import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { format } from "date-fns";

function MovieFilterSettings() {
  const { filters, removeFilters } = useFilterSearchParams();

  const { data: genreResponse } = useQuery({
    queryKey: ["genres"],
    queryFn: () => fetchMovieGenres(),
  });

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {!!filters.genre.length && (
        <>
          {filters.genre.map((genre) => (
            <div
              key={genre}
              className="flex cursor-pointer items-center gap-1 rounded-sm bg-primary px-2 py-1 text-sm text-primary-foreground"
              onClick={() => removeFilters({ filter: "genre", value: genre })}
            >
              {genreResponse?.genres.find((g) => +genre === g.id)?.name}
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
  filter: Exclude<Filter, "genre">;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const { filters, setFilters, removeFilters } = useFilterSearchParams();
  return (
    <div className="flex cursor-pointer items-center gap-1 rounded-sm bg-primary px-2 py-1 text-sm text-primary-foreground">
      <label>{label}:</label>
      {props.type === "date" && (
        <Popover>
          <PopoverTrigger className="flex items-center gap-1">
            <BiCalendar />
            {format(new Date(filters[filter]!), "yyyy-MM-dd")}
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