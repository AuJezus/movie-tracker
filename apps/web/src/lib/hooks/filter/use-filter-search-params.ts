import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import type { Filter, Filters } from "./types";
import { filterTypes } from "./config";

export default function useFilterSearchParams() {
  const router = useRouter();
  const params = useSearchParams();

  const initialParams = useMemo<Filters>(() => {
    const filters: Filters = {
      genre: params.getAll("genre"),
    };

    for (const [filter, value] of params.entries()) {
      if (!filterTypes.includes(filter as Filter) || filter === "genre")
        continue;

      filters[filter as Exclude<Filter, "genre">] = value;
    }

    return filters;
  }, [params]);
  const [filters, setFilters] = useState<Filters>(initialParams);

  useEffect(() => {
    setFilters(initialParams);
  }, [initialParams]);

  useEffect(() => {
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([name, val]) => {
      if (!val) return;
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

  const removeFilter = useCallback(
    (...filterArr: { filter: Filter; value?: string }[]) => {
      filterArr.forEach(({ filter, value }) => {
        if (filter === "genre")
          return setFilters((f) => ({
            ...f,
            [filter]: f[filter].filter((val) => value !== val),
          }));

        return setFilters((f) => ({ ...f, [filter]: undefined }));
      });
    },
    [],
  );

  return {
    setFilters: setFilter,
    removeFilters: removeFilter,
    filters,
  };
}
