import { format } from "date-fns";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BiEdit, BiStar } from "react-icons/bi";
import { Button } from "~/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";
import Heading, { headingVariants } from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import { initApiClient } from "~/lib/api";
import { testImageResponse, testMovieResponse } from "~/lib/mockData";
import { cn } from "~/lib/utils";

async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const apiClient = initApiClient(cookies());

  const movieRes = await apiClient.movies.getMovieDetails({
    params: { id: params.id },
  });
  if (movieRes.status === 404) notFound();
  if (movieRes.status !== 200) throw new Error("Could not fetch movie details");

  const mediaRes = await apiClient.movies.getMovieMedia({
    params: { id: params.id },
  });

  const movie = movieRes.body;

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

      <div className="mb-12 flex flex-col gap-10 md:flex-row">
        <div className="basis-3/5">
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

        <div className="basis-2/5">
          <div className="mb-4 flex items-center justify-between">
            <p className={cn(headingVariants(), "text-3xl")}>Your Review</p>
            <div className="flex w-fit items-center gap-2 rounded-md border-2 bg-primary px-2 py-1 text-primary-foreground">
              <BiStar /> 7.75
            </div>
            <BiEdit className="text-3xl text-primary  " />
          </div>

          {/* <p className="mb-2">You haven&apos;t reviewed this movie yet</p>
          <Button size="sm">Mark as completed and write a review</Button> */}

          <p>
            Never have I EVER related to a movie more in my life. I just watched
            it today in theaters, and it was worth every penny spent watching
            it. This last year really has been anxiety-inducing for me, from
            tests to friends, and Inside Out 2 was so accurate with all of the
            emotions that can come from stressful changes in one’s life. It had
            some really good funny moments sprinkled in there too, the comedic
            timing was on point. Pixar made a movie that was relatable, funny, a
            little heart wrenching, and I can confidently say it has been the
            best thing they have put out since Onward (2020). The story was
            cohesive, and instead of relying on overplayed plot tropes, they did
            a really good job at keeping the story unique. I like how this movie
            focused a little more on the friends aspect of life in contrast to
            the previous movie, which focused more on family.
          </p>
        </div>
      </div>

      <Heading level="h2">More To Explore</Heading>
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
