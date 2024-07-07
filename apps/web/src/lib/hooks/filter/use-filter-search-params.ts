import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback, useMemo } from "react";
import type { DiscoverFilter, DiscoverFilters, SortBy } from "api-contract";

const discoverFilters: DiscoverFilter[] = [
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

function isDiscoverFilter(key: string): key is DiscoverFilter {
  return discoverFilters.includes(key as keyof DiscoverFilters);
}

export default function useFilterSearchParams() {
  const router = useRouter();
  const params = useSearchParams();

  const filters = useMemo<DiscoverFilters>(() => {
    const paramFilters: DiscoverFilters = {
      genre: params.getAll("genre"),
    };

    for (const [filter, value] of params.entries()) {
      if (isDiscoverFilter(filter)) {
        if (filter === "genre") continue;
        else if (filter === "sortBy" || filter === "order") {
          if (filter === "sortBy") paramFilters[filter] = value as SortBy;
          else if (filter === "order")
            paramFilters[filter] = value as "asc" | "desc";
        } else paramFilters[filter] = value;
      }
    }

    return paramFilters;
  }, [params]);

  useEffect(() => {
    const newParams = new URLSearchParams();

    Object.entries(filters).forEach(([name, val]) => {
      if (!val) return;

      if (typeof val === "string") newParams.append(name, val);
      else if (Array.isArray(val))
        val.forEach((v) => newParams.append(name, v as string));
    });

    router.replace("?" + newParams.toString());
  }, [filters, router]);

  const setFilters = useCallback(
    (...filterArr: { filter: DiscoverFilter; value: string }[]) => {
      const newParams = new URLSearchParams(params);

      filterArr.forEach(({ filter, value }) => {
        if (filter === "genre" && !filters.genre?.includes(value))
          newParams.append(filter, value);
        else newParams.set(filter, value);
      });

      router.push("?" + newParams.toString());
    },
    [router, params, filters],
  );

  const removeFilters = useCallback(
    (...filterArr: { filter: DiscoverFilter; value?: string }[]) => {
      const newParams = new URLSearchParams(params);

      filterArr.forEach(({ filter, value }) =>
        filter === "genre" && value
          ? newParams.delete(filter, value)
          : newParams.delete(filter),
      );

      router.push("?" + newParams.toString());
    },
    [router, params],
  );

  return {
    filters,
    setFilters,
    removeFilters,
  };
}
