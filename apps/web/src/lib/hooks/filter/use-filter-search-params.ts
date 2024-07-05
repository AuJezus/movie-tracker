import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { Filter, Filters } from "./types";
import { defaultFilters, filterTypes } from "./config";

export default function useFilterSearchParams() {
  const router = useRouter();
  const params = useSearchParams();

  const initialParams = useMemo<Filters>(() => {
    const filters: Filters = {
      ...defaultFilters,
      genre: params.getAll("genre"),
    };

    for (const [filter, value] of params.entries()) {
      if (!filterTypes.includes(filter as Filter) || filter === "genre")
        continue;

      filters[filter as Exclude<Filter, "genre">] = value;
    }

    return filters;

    // return {
    //   genre: params.getAll("genre"),
    //   ratingFrom: params.get("ratingFrom"),
    //   ratingTo: params.get("ratingTo"),
    //   runtimeFrom: params.get("runtimeFrom"),
    //   runtimeTo: params.get("runtimeTo"),
    //   releasedFrom: params.get("releasedFrom"),
    //   releasedTo: params.get("releasedTo"),
    //   sortBy: params.get("sortBy"),
    //   order: params.get("order"),
    //   query: params.get("query"),
    // };
  }, [params]);
  const [filters, setFilters] = useState<Filters>(initialParams);

  useEffect(() => {
    setFilters(initialParams);
  }, [initialParams]);

  useEffect(() => {
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([name, val]) => {
      if (typeof val === "string") return newParams.append(name, val);
      val.forEach((v) => newParams.append(name, v));
    });

    router.push("?" + newParams.toString());
  }, [filters, router]);

  const setFilter = useCallback(
    (...filterArr: { filter: Filter; value: string }[]) => {
      filterArr.forEach(({ filter, value }) => {
        if (filter === "genre") {
          if (filters[filter].includes(value)) return;
          return setFilters((f) => ({ ...f, [filter]: [...f[filter], value] }));
        } else {
          if (filters[filter] === value) return;
          setFilters((f) => ({ ...f, [filter]: value }));
        }
      });
    },
    [filters],
  );

  return {
    setFilters: setFilter,
    filters,
  };
}
