import Image from "next/image";
import { BiEdit, BiStar } from "react-icons/bi";
import MovieList from "~/components/movie-list";
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
import { testImageResponse, testMovieResponse } from "~/lib/mockData";
import { cn } from "~/lib/utils";

function MovieDetailsPage() {
  return (
    <PageContainer>
      <div className="mb-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <Heading level="h1" className="mb-0">
          The Best Movie Ever
        </Heading>

        <div className="flex items-center gap-2 rounded-md border-2 bg-primary px-3 py-1.5 text-xl text-primary-foreground md:text-2xl">
          <BiStar /> 7.75
        </div>

        <Image
          src={`https://image.tmdb.org/t/p/w400/oxxqiyWrnM0XPnBtVe9TgYWnPxT.jpg`}
          width={400}
          height={600}
          alt="a"
          className="mx-auto object-cover md:hidden"
        />
      </div>

      <Carousel className="mb-4">
        <CarouselContent className="md:h-[500px]">
          <CarouselItem className="relative hidden basis-1/2 md:block xl:basis-2/6">
            <Image
              src={`https://image.tmdb.org/t/p/w400/oxxqiyWrnM0XPnBtVe9TgYWnPxT.jpg`}
              fill
              alt="a"
              className="object-cover"
            />
          </CarouselItem>

          <CarouselItem className="xl:basis-4/6">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/L4DrolmDxmw?si=3BYwD2RELvJKm_nz"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full"
            ></iframe>
          </CarouselItem>

          {testImageResponse.backdrops
            .filter(
              (backdrop) =>
                backdrop.iso_639_1 === null || backdrop.iso_639_1 === "en",
            )
            .map((backdrop) => (
              <CarouselItem
                key={backdrop.file_path}
                className="relative lg:basis-4/6"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${backdrop.file_path}`}
                  height={backdrop.height}
                  width={backdrop.width}
                  alt="a"
                  className="h-full w-full object-cover"
                />
              </CarouselItem>
            ))}
        </CarouselContent>

        <CarouselPrevious className="left-1 xl:-left-12" />
        <CarouselNext className="right-1 xl:-right-12" />
      </Carousel>

      <div className="mb-4 flex flex-wrap gap-4">
        <div className="w-fit rounded-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
          Romance
        </div>
        <div className="w-fit rounded-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
          Funny
        </div>
        <div className="w-fit rounded-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
          Something
        </div>
      </div>

      <p className="mb-8">
        Teenager Riley&apos;s mind headquarters is undergoing a sudden
        demolition to make room for something entirely unexpected: new Emotions!
        Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a
        successful operation by all accounts, aren’t sure how to feel when
        Anxiety shows up. And it looks like she’s not alone.
      </p>

      <div className="mb-12 flex flex-col gap-10 md:flex-row">
        <div className="basis-3/5">
          <MovieStat name="Budget">
            <p>2000000$</p>
          </MovieStat>

          <MovieStat name="Release Date">
            <p>Aug 16, 2018</p>
          </MovieStat>

          <MovieStat name="Runtime">
            <p>1hr 35min</p>
          </MovieStat>

          <MovieStat name="Status">
            <p>Released</p>
          </MovieStat>

          <MovieStat name="Homepage">
            <a href="www.lolas.lt">www.lolas.lt</a>
          </MovieStat>

          <MovieStat name="Production Countries">
            <p>Litva</p>
            <p>England</p>
          </MovieStat>

          <MovieStat name="Status">
            <p>Released</p>
          </MovieStat>

          <MovieStat name="Tagline">
            <p>Enjoy somethig very much</p>
          </MovieStat>

          <MovieStat name="Cast">
            <p>A. Jonas</p>
            <p>B. Ponas</p>
            <p>C. Ponesnis</p>
          </MovieStat>

          <MovieStat name="Crew">
            <p>A. Jonas</p>
            <p>B. Ponas</p>
            <p>C. Ponesnis</p>
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
      <MovieList movies={testMovieResponse} />
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
    <p className="w-32 text-lg font-medium">{name}</p>
    <div className="flex flex-wrap gap-4">{children}</div>
  </div>
);

export default MovieDetailsPage;
