import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/lib/utils";
import {
  BiMovie,
  BiMoviePlay,
  BiRevision,
  BiSolidHeart,
  BiTime,
  BiTrash,
} from "react-icons/bi";
import Heading, { headingVariants } from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import { initApiClient, queryApiClient } from "~/lib/api";
import { cookies } from "next/headers";
import MovieList from "~/components/movie/movie-list";
import getQueryClient from "~/lib/get-query-client";
import ListMovieCards from "~/components/movie/list-movie-cards";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import ReviewList from "~/components/review-list";
import MovieCard from "~/components/movie/movie-card";

const listIcons = [<BiMoviePlay />, <BiMovie />, <BiTrash />];

export default async function MyLibraryPage() {
  const apiClient = initApiClient(cookies());
  const queryClient = getQueryClient();

  const userRes = await apiClient.users.getCurrent();
  if (userRes.status !== 200) throw new Error("Could not get current user");

  const statsRes = await apiClient.users.getStats();
  if (statsRes.status !== 200) throw new Error("Could not get user stats");

  const listsRes = await apiClient.lists.getLists();
  if (listsRes.status !== 200) throw new Error("Could not get movie lists");

  const favouritesRes = await apiClient.favourites.getFavouriteMovies();
  if (favouritesRes.status !== 200) throw new Error("Could not get favourites");

  const { user } = userRes.body;
  const stats = statsRes.body;
  const lists = listsRes.body;
  const favourites = favouritesRes.body;

  lists.forEach((list) =>
    queryApiClient.lists.getList.setQueryData(
      queryClient,
      ["lists", list.typeId],
      { ...listsRes, body: list },
    ),
  );

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
            <BiTime className="text-primary" />{" "}
            {Math.floor(stats.watchTime / 60)}hr {stats.watchTime % 60}mins
          </p>
        </div>

        <div>
          <p className="mb-2">Total Movies Watched:</p>
          <p className="ml-8 flex items-center gap-2 text-xl font-semibold">
            <BiMovie className="text-primary" /> {stats.moviesWatched} movies
          </p>
        </div>

        <div>
          <p className="mb-2">Last Movie:</p>
          <p className="ml-8 flex items-center gap-2 text-xl font-semibold">
            <BiMovie className="text-primary" />
            {stats.lastMovieTitle
              ? `"${stats.lastMovieTitle}"`
              : "You haven't completed any movie"}
          </p>
        </div>
      </div>

      <Tabs defaultValue={lists[0]?.typeId.toString()}>
        <TabsList className="mb-2 h-fit flex-wrap justify-around">
          {lists.map((list, i) => (
            <TabsTrigger
              key={list.typeId}
              value={list.typeId.toString()}
              className="flex items-center gap-2 capitalize"
            >
              {listIcons[i]} {list.name}
            </TabsTrigger>
          ))}

          <TabsTrigger
            value="favourites"
            className="flex items-center gap-2 capitalize"
          >
            <BiSolidHeart /> Favourites
          </TabsTrigger>

          <TabsTrigger
            value="review"
            className="flex items-center gap-2 capitalize"
          >
            <BiRevision /> Reviews
          </TabsTrigger>
        </TabsList>

        <Hydrate state={dehydrate(queryClient)}>
          {lists.map((list) => (
            <TabsContent
              key={list.typeId}
              value={list.typeId.toString()}
              asChild
            >
              <MovieList>
                <ListMovieCards typeId={list.typeId} />
              </MovieList>
            </TabsContent>
          ))}

          <TabsContent value="favourites" asChild>
            <MovieList>
              {favourites.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </MovieList>
          </TabsContent>

          <TabsContent value="review">
            <ReviewList />
          </TabsContent>
        </Hydrate>
      </Tabs>
    </PageContainer>
  );
}
