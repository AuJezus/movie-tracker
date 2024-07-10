import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import { BiMovie, BiMoviePlay, BiTime, BiTrash } from "react-icons/bi";
import Heading, { headingVariants } from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import { testMovieResponse } from "~/lib/mockData";
import { initApiClient, queryApiClient } from "~/lib/api";
import getQueryClient from "~/lib/get-query-client";
import { cookies } from "next/headers";

export default async function MyLibraryPage() {
  const userRes = await initApiClient(cookies()).users.getCurrent();
  if (userRes.status !== 200) throw new Error("Could not get current user");

  const { user } = userRes.body;

  // user
  // user stats
  // user lists
  // somehow make the movie-list work with other movies

  return (
    <PageContainer>
      <Heading level="h1" className="mb-10">
        My Library
      </Heading>

      <div className="mb-8 flex items-center justify-center divide-primary border-b-2 border-primary pb-8">
        <Image
          src={`${user.picture}=s100`}
          width={100}
          height={100}
          alt="Profile picture"
          className="mr-4 box-content h-20 w-20 min-w-20 border-r-2 border-primary object-cover pr-4 sm:mr-8 sm:h-24 sm:w-24 sm:pr-8"
        />

        <p className={cn(headingVariants({ level: "h2" }), "mb-0")}>
          {user.username}
        </p>
      </div>

      <div className="mb-10 flex flex-wrap justify-around gap-y-6">
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
      {/* 
      <Tabs defaultValue="completed">
        <TabsList className="mb-2 h-fit flex-wrap justify-around">
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
      </Tabs> */}
    </PageContainer>
  );
}
