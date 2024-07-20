import { format } from "date-fns";
import { cookies } from "next/headers";
import { BiStar } from "react-icons/bi";
import { initApiClient } from "~/lib/api";

async function ReviewList() {
  const queryApiClient = initApiClient(cookies());
  const movieRes = await queryApiClient.reviews.getReviewedMovies();

  if (movieRes.status !== 200)
    throw new Error("Could not fetch reviewed movies");

  return (
    <ul className="mx-auto grid max-w-sm grid-cols-1 gap-4 sm:max-w-full sm:grid-cols-2 md:grid-cols-3">
      {movieRes.body.map((movie) => (
        <li
          key={movie.review.id}
          className="cursor-pointer rounded-md bg-secondary p-3 text-secondary-foreground ring-primary transition-all hover:scale-105 hover:ring-2"
        >
          <p className="text-xl font-medium">{movie.title}</p>
          <p className="mb-4 text-muted-foreground">
            {format(movie.release_date, "yyyy-MM-dd")}
          </p>
          <p className="mb-2 break-words">
            {`"${movie.review.review
              .split(" ")
              .filter((s) => s !== "")
              .slice(0, 20)
              .join(" ")
              .slice(0, 150)}${movie.review.review.length > 150 ? "..." : ""}"`}
          </p>
          <div className="ml-auto flex w-fit items-center gap-1 rounded-md bg-primary px-2 py-1 text-sm text-primary-foreground">
            {movie.review.rating.toFixed(2)} <BiStar />
          </div>
        </li>
      ))}

      {!movieRes?.body.length && (
        <li className="col-span-full mt-8 text-center">No reviews yet 😖</li>
      )}
    </ul>
  );
}

export default ReviewList;
