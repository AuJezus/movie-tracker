"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { queryApiClient } from "~/lib/api";
import type { FavouriteMovie } from "../../../../packages/database/dist/types";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import { cn } from "~/lib/utils";

function FavouriteButton({
  movieId,
  initialFavouriteMovie,
  className,
}: {
  movieId: number;
  initialFavouriteMovie: FavouriteMovie | undefined;
  className?: string;
}) {
  const queryClient = useQueryClient();

  const [isFavourite, setIsFavourite] = useState(!!initialFavouriteMovie);

  const favouriteMutation =
    queryApiClient.favourites.addToFavourites.useMutation({
      onMutate: () => setIsFavourite(true),
      onError: () => setIsFavourite(false),
      onSettled: () => queryClient.invalidateQueries(["favourites"]),
    });

  const unFavouriteMutation =
    queryApiClient.favourites.deleteFromFavourites.useMutation({
      onMutate: () => setIsFavourite(false),
      onError: () => setIsFavourite(true),
      onSettled: () => queryClient.invalidateQueries(["favourites"]),
    });

  const onFavourite = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      isFavourite
        ? unFavouriteMutation.mutate({
            params: { movieId: movieId.toString() },
          })
        : favouriteMutation.mutate({
            body: { movieId },
          });
    },
    [isFavourite, favouriteMutation, unFavouriteMutation, movieId],
  );

  return (
    <button
      onClick={onFavourite}
      className={cn("mr-2 rounded-full bg-primary p-2 text-xl", className)}
    >
      {!isFavourite && <BiHeart className="text-primary-foreground" />}

      {isFavourite && <BiSolidHeart className="text-primary-foreground" />}
    </button>
  );
}

export default FavouriteButton;
