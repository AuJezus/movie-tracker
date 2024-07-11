"use client";

import { format } from "date-fns";
import { queryApiClient } from "~/lib/api";

function ReviewList() {
  const { data, isLoading } = queryApiClient.reviews.getReviews.useQuery([
    "reviews",
  ]);

  return (
    <ul className="mx-auto grid max-w-sm grid-cols-1 gap-4 sm:max-w-full sm:grid-cols-2 md:grid-cols-3">
      {!isLoading &&
        data?.body.map((review) => (
          <li className="cursor-pointer rounded-md bg-secondary p-3 text-secondary-foreground ring-primary transition-all hover:scale-105 hover:ring-2">
            <p className="text-xl font-medium">{review.movie.title}</p>
            <p className="mb-4 text-muted-foreground">
              {format(review.movie.release_date, "yyyy-MM-dd")}
            </p>
            <p>
              {`"${review.review
                .split(" ")
                .filter((s) => s !== "")
                .slice(0, 20)
                .join(" ")
                .slice(0, 150)}${review.review.length > 150 ? "..." : ""}"`}
              "
            </p>
          </li>
        ))}

      {!isLoading && !data?.body.length && (
        <li className="col-span-full mt-8 text-center">No reviews yet 😖</li>
      )}

      {isLoading && (
        <li className="col-span-full mt-8 animate-pulse text-center">
          Loading...
        </li>
      )}
    </ul>
  );
}

export default ReviewList;
