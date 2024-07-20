"use client";

import Image from "next/image";
import { MouseEvent, forwardRef, useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MdMovieEdit } from "react-icons/md";
import {
  BiCalendarStar,
  BiHeart,
  BiSolidHeart,
  BiStar,
  BiTime,
} from "react-icons/bi";
import { format } from "date-fns";
import { cn } from "~/lib/utils";
import { buttonVariants } from "../ui/button";
import { queryApiClient } from "~/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { Movie } from "api-contract";
import { ListMovie } from "../../../../../packages/database/dist/types";

const MovieCard = forwardRef<HTMLLIElement, { movie: Movie }>(
  ({ movie }, ref) => {
    const queryClient = useQueryClient();

    const { data: typesRes } = queryApiClient.lists.getTypes.useQuery([
      "lists",
      "types",
    ]);

    const [listMovie, setListMovie] = useState<Partial<ListMovie> | undefined>(
      movie.list,
    );
    const [isFavourite, setIsFavourite] = useState(!!movie.favourite?.id);

    const addToListMutation = queryApiClient.lists.addToList.useMutation({
      onMutate: (newListMovie) => {
        const previousListMovie = listMovie;
        setListMovie(newListMovie.body);
        return { previousListMovie };
      },
      onError: (err, newListMovie, context) =>
        setListMovie(context as typeof listMovie),
      onSettled: (data) =>
        queryClient.invalidateQueries(["lists", data?.body.listTypeId]),
    });

    const editListMutation = queryApiClient.lists.editMovie.useMutation({
      onMutate: (newListMovie) => {
        const previousListMovie = listMovie;
        setListMovie(newListMovie.body);
        return previousListMovie;
      },
      onError: (err, newListMovie, context) =>
        setListMovie(context as typeof listMovie),
      onSettled: (data, error, newListMovie, context) => {
        queryClient.invalidateQueries(["lists", data?.body.listTypeId]);
        queryClient.invalidateQueries([
          "lists",
          (context as typeof listMovie)?.listTypeId,
        ]);
      },
    });

    const deleteFromListMutation = queryApiClient.lists.deleteMovie.useMutation(
      {
        onMutate: (newListMovie) => {
          const previousListMovie = listMovie;
          setListMovie(newListMovie.body);
          return { previousListMovie };
        },
        onError: (err, newListMovie, context) =>
          setListMovie(context as typeof listMovie),
        onSettled: (data) =>
          queryClient.invalidateQueries(["lists", data?.body.listTypeId]),
      },
    );

    const onSelect = useCallback(
      (value: string) =>
        !listMovie
          ? addToListMutation.mutate({
              body: { movieId: movie.id, listTypeId: Number(value) },
            })
          : value === "delete"
            ? deleteFromListMutation.mutate({
                params: { listMovieId: listMovie.id!.toString() },
              })
            : editListMutation.mutate({
                body: {
                  id: listMovie.id!,
                  listTypeId: Number(value),
                },
                params: { listMovieId: listMovie.id!.toString() },
              }),
      [listMovie],
    );

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
      (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();

        isFavourite
          ? unFavouriteMutation.mutate({
              params: { movieId: movie.id.toString() },
            })
          : favouriteMutation.mutate({
              body: { movieId: movie.id },
            });
      },
      [isFavourite],
    );

    return (
      <li key={movie.id} ref={ref}>
        <Link
          href={`/movie/${movie.id}`}
          className="dark group relative flex aspect-[6/8] flex-col justify-between overflow-hidden rounded-md border-2 transition-all hover:scale-105 hover:border-primary has-[[data-state=open]]:scale-105 has-[[data-state=open]]:border-primary"
        >
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              fill
              alt="a"
              className="-z-20 object-cover"
            />
          )}

          {/* Darken effect */}
          <div className="absolute -z-10 h-full w-full bg-gradient-to-t from-background to-transparent to-30%"></div>
          <div className="absolute -z-10 h-full w-full translate-y-full bg-gradient-to-t from-background from-70% to-transparent opacity-0 transition-all group-has-[[data-state=open]]:translate-y-0 group-has-[[data-state=open]]:opacity-30 lg:group-hover:translate-y-0 lg:group-hover:opacity-30"></div>

          <div className="mt-2 flex flex-col gap-2">
            <div className="flex items-center justify-between text-primary-foreground">
              <div className="flex w-fit items-center gap-2 rounded-r-md bg-primary px-3 py-1.5 transition-transform">
                <BiStar className="text-lg" /> {movie.vote_average.toFixed(2)}
                /10
              </div>

              <button
                onClick={onFavourite}
                className="mr-2 rounded-full bg-primary p-2 text-xl"
              >
                {!isFavourite && (
                  <BiHeart className="text-primary-foreground" />
                )}

                {isFavourite && (
                  <BiSolidHeart className="text-primary-foreground" />
                )}
              </button>
            </div>

            <div className="flex w-fit translate-x-full items-center gap-2 self-end rounded-l-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform group-has-[[data-state=open]]:translate-x-0 lg:group-hover:translate-x-0">
              <BiTime className="text-lg" />
              {`${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}min`}
            </div>

            <Select
              onValueChange={onSelect}
              value={listMovie?.listTypeId?.toString()}
            >
              <SelectTrigger
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "w-fit -translate-x-full gap-2 rounded-l-none border-0 capitalize transition-transform focus-within:ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 group-has-[[data-state=open]]:translate-x-0 lg:group-hover:translate-x-0",
                )}
                icon={<MdMovieEdit />}
              >
                <SelectValue placeholder="Add to list" />
              </SelectTrigger>
              <SelectContent>
                {typesRes?.body.map((type) => (
                  <SelectItem
                    key={type.id}
                    value={type.id.toString()}
                    className="capitalize"
                  >
                    {type.name}
                  </SelectItem>
                ))}

                {!!listMovie && (
                  <SelectItem value="delete" className="text-destructive">
                    Remove From List
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            <div className="flex w-fit translate-x-full items-center gap-2 self-end rounded-l-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform group-has-[[data-state=open]]:translate-x-0 lg:group-hover:translate-x-0">
              <BiCalendarStar className="text-lg" />
              {movie.release_date
                ? format(movie.release_date, "yyyy-MM-dd")
                : "N/A"}
            </div>
          </div>

          <p className="p-2 font-semibold  text-primary-foreground">
            {movie.title}
          </p>
        </Link>
      </li>
    );
  },
);
MovieCard.displayName = "MovieCard";

export default MovieCard;
