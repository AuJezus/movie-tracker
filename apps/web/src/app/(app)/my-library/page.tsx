import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { BiMovie, BiMoviePlay, BiTime, BiTrash } from "react-icons/bi";
import Heading, { headingVariants } from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import MovieList from "~/components/movie-list";

import { testMovieResponse } from "~/lib/mockData";

export default function MyLibraryPage() {
  return (
    <PageContainer>
      <Heading level="h1" className="mb-10">
        My Library
      </Heading>

      <div className="mb-8 flex items-center justify-center divide-primary border-b-2 border-primary pb-8">
        <Image
          src={`https://image.tmdb.org/t/p/w500/oxxqiyWrnM0XPnBtVe9TgYWnPxT.jpg`}
          width={500}
          height={750}
          alt="a"
          className="mr-8 box-content h-24 w-24 border-r-2 border-primary object-cover pr-8"
        />

        <p className={cn(headingVariants({ level: "h2" }), "mb-0")}>AuJezus</p>
      </div>

      <div className="mb-10 flex justify-around">
        <div>
          <p className="mb-2">Total Time Watched:</p>
          <p className="ml-8 flex items-center gap-2 text-xl font-semibold">
            <BiTime className="text-primary" /> 43hr 43mins
          </p>
        </div>

        <div>
          <p className="mb-2">Total Movies Watched:</p>
          <p className="ml-8 flex items-center gap-2 text-xl font-semibold">
            <BiMovie className="text-primary" /> 23 movies
          </p>
        </div>

        <div>
          <p className="mb-2">Last Movie:</p>
          <p className="ml-8 flex items-center gap-2 text-xl font-semibold">
            <BiMovie className="text-primary" /> &quot;Tavo Mama: The
            Lunch&quot;
          </p>
        </div>
      </div>

      <Tabs defaultValue="completed">
        <TabsList className="mb-2">
          <TabsTrigger value="completed" className="flex items-center gap-2">
            <BiMoviePlay /> Completed
          </TabsTrigger>
          <TabsTrigger
            value="plan-to-watch"
            className="flex items-center gap-2"
          >
            <BiMovie /> Plan-to Watch
          </TabsTrigger>
          <TabsTrigger value="dropped" className="flex items-center gap-2">
            <BiTrash /> Dropped
          </TabsTrigger>
        </TabsList>

        <TabsContent value="completed" asChild>
          <MovieList movies={testMovieResponse} />
        </TabsContent>

        <TabsContent value="plan-to-watch" asChild>
          <MovieList movies={testMovieResponse} />
        </TabsContent>

        <TabsContent value="dropped" asChild>
          <MovieList movies={testMovieResponse} />
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
}
