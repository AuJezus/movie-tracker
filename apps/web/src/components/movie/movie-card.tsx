"use client";

import Image from "next/image";
import { BiCalendarStar, BiStar, BiTime } from "react-icons/bi";
import { format } from "date-fns";
import Link from "next/link";
import { type Movie } from "api-contract";
import AddToListButton from "../add-to-list-button";
import FavouriteButton from "../favourite-button";
import { forwardRef } from "react";

const MovieCard = forwardRef<HTMLLIElement, { movie: Movie }>(
  ({ movie }, ref) => {
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

              <FavouriteButton
                movieId={movie.id}
                initialFavouriteMovie={movie.favourite}
              />
            </div>

            <div className="flex w-fit translate-x-full items-center gap-2 self-end rounded-l-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform group-has-[[data-state=open]]:translate-x-0 lg:group-hover:translate-x-0">
              <BiTime className="text-lg" />
              {`${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}min`}
            </div>

            <AddToListButton
              movieId={movie.id}
              initialListMovie={movie.list}
              className="w-fit -translate-x-full rounded-l-none transition-transform group-has-[[data-state=open]]:translate-x-0 lg:group-hover:translate-x-0"
            />

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
