import { Hydrate, dehydrate } from "@tanstack/react-query";
import { format } from "date-fns";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import {  BiStar } from "react-icons/bi";
import ReviewForm from "~/components/review-form";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Heading from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import { initApiClient } from "~/lib/api";
import getQueryClient from "~/lib/get-query-client";

async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const apiClient = initApiClient(cookies());
  const queryClient = getQueryClient();

  const movieRes = await apiClient.movies.getMovieDetails({
    params: { id: params.id },
  });
  if (movieRes.status === 404) notFound();
  if (movieRes.status !== 200) throw new Error("Could not fetch movie details");
  const movie = movieRes.body;

  const mediaRes = await apiClient.movies.getMovieMedia({
    params: { id: movie.id.toString() },
  });

  const reviewRes = await apiClient.reviews.getReviewByMovieId({
    params: { id: movie.id.toString() },
  });
  queryClient.setQueryData(["reviews", "movies", movie.id], reviewRes);

  return (
    <PageContainer>
      <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <Heading level="h1" className="mb-0">
          {movie.title}
        </Heading>

        <div className="flex items-center gap-2 rounded-md border-2 bg-primary px-3 py-1.5 text-xl text-primary-foreground md:text-2xl">
          <BiStar /> {movie.vote_average.toFixed(2)}
        </div>

        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            width={400}
            height={600}
            alt={`"${movie.title}" poster`}
            className="mx-auto object-cover md:hidden"
          />
        )}
      </div>

      <Carousel className="mb-4">
        <CarouselContent className="md:h-[500px]">
          <CarouselItem className="relative hidden basis-1/2 bg-secondary text-secondary-foreground md:block xl:basis-2/6">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                fill
                alt={`"${movie.title}" poster`}
                className="object-cover"
              />
            ) : (
              <p className="flex h-full w-full items-center justify-center text-xl">
                No poster 😭
              </p>
            )}
          </CarouselItem>

          {mediaRes.status === 200 && (
            <CarouselItem className="xl:basis-4/6">
              <iframe
                src={`https://www.youtube.com/embed/${mediaRes.body.ytKey}`}
                title={`"${movie.title} trailer"`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </CarouselItem>
          )}

          {mediaRes.status === 200 &&
            mediaRes.body.pictures.map((picture) => (
              <CarouselItem
                key={picture.file_path}
                className="relative lg:basis-4/6"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${picture.file_path}`}
                  height={picture.height}
                  width={picture.width}
                  alt={`Backdrop from "${movie.title}"`}
                  className="h-full w-full object-cover"
                />
              </CarouselItem>
            ))}
        </CarouselContent>

        <CarouselPrevious className="left-1 xl:-left-12" />
        <CarouselNext className="right-1 xl:-right-12" />
      </Carousel>

      <div className="mb-4 flex flex-wrap gap-4">
        {movie.genres.map((genre) => (
          <div
            key={genre.id}
            className="w-fit rounded-md bg-secondary px-3 py-1.5 capitalize text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {genre.name}
          </div>
        ))}
      </div>

      <p className="mb-8">{movie.overview}</p>

      <div className="mb-12 flex w-full flex-col gap-10 md:flex-row">
        <div className="flex-shrink-0 flex-grow-0 basis-3/5">
          <MovieStat name="Release Date">
            <p>{format(movie.release_date, "MMM d, yyyy")}</p>
          </MovieStat>

          <MovieStat name="Tagline">{movie.tagline}</MovieStat>

          <MovieStat name="Runtime">
            <p>
              {movie.runtime
                ? `${Math.floor(movie.runtime / 60)}hr ${movie.runtime % 60}min`
                : ""}
            </p>
          </MovieStat>

          <MovieStat name="Status">
            <p>{movie.status}</p>
          </MovieStat>

          <MovieStat name="Homepage">
            <a href={movie.homepage} target="_blank">
              {movie.homepage}
            </a>
          </MovieStat>

          <MovieStat name="Production Countries">
            {movie.production_countries.map((country) => (
              <p key={country.iso_3166_1}>{country.name}</p>
            ))}
          </MovieStat>

          <MovieStat name="Budget">
            <p>{movie.budget ? `${movie.budget}$` : ""}</p>
          </MovieStat>
        </div>

        <Hydrate state={dehydrate(queryClient)}>
          <ReviewForm movieId={movie.id} className="basis-2/5" />
        </Hydrate>
      </div>

      <Heading level="h2">Trending Movies</Heading>
      {/* <MovieList movies={testMovieResponse} /> */}
    </PageContainer>
  );
}

const MovieStat = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => (
  <div className="mb-2 flex items-center border-b-2 pb-2 last:mb-0 last:border-none">
    <p className="w-32 flex-shrink-0 text-lg font-medium">{name}</p>
    <div className="flex flex-wrap gap-4">{children}</div>
  </div>
);

export default MovieDetailsPage;
