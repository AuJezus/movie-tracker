import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useCallback, useMemo } from "react";
import type { DiscoverFilter, DiscoverFilters, SortBy } from "api-contract";
import { getFiltersFromParams } from "./utils";

export default function useFilterSearchParams() {
  const router = useRouter();
  const params = useSearchParams();

  const filters = useMemo<DiscoverFilters>(
    () => getFiltersFromParams(params),
    [params],
  );

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
