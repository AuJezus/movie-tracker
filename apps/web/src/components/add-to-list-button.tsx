"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { queryApiClient } from "~/lib/api";
import type { ListMovie } from "../../../../packages/database/dist/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "~/lib/utils";
import { buttonVariants } from "./ui/button";
import { MdMovieEdit } from "react-icons/md";

function AddToListButton({
  movieId,
  initialListMovie,
  className,
}: {
  movieId: number;
  initialListMovie: Partial<ListMovie> | undefined;
  className?: string;
}) {
  const queryClient = useQueryClient();

  const { data: typesRes } = queryApiClient.lists.getTypes.useQuery([
    "lists",
    "types",
  ]);

  const [listMovie, setListMovie] = useState(initialListMovie);

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
    onSettled: (data, error, newListMovie, context) =>
      Promise.all([
        queryClient.invalidateQueries(["lists", data?.body.listTypeId]),
        queryClient.invalidateQueries([
          "lists",
          (context as typeof listMovie)?.listTypeId,
        ]),
      ]),
  });

  const deleteFromListMutation = queryApiClient.lists.deleteMovie.useMutation({
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

  const onSelect = useCallback(
    (value: string) =>
      !listMovie
        ? addToListMutation.mutate({
            body: { movieId: movieId, listTypeId: Number(value) },
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
    [
      listMovie,
      addToListMutation,
      deleteFromListMutation,
      editListMutation,
      movieId,
    ],
  );

  return (
    <Select onValueChange={onSelect} value={listMovie?.listTypeId?.toString()}>
      <SelectTrigger
        className={cn(
          buttonVariants({ size: "sm" }),
          "gap-2 border-0 capitalize focus-within:ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0",
          className,
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
  );
}

export default AddToListButton;
