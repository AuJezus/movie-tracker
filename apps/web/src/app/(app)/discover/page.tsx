import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "~/components/ui/menubar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";
import { LucideChevronRight } from "lucide-react";
import Heading from "~/components/ui/heading";
import PageContainer from "~/components/ui/page-container";
import MovieList from "~/components/movie-list";

import { testMovieResponse } from "~/lib/mockData";

export default function DiscoverPage() {
  return (
    <PageContainer>
      <Heading level="h1">Discover New Movies</Heading>

      <p className="mb-8 max-w-4xl">
        Explore a vast collection of movies from all genres and eras. Find
        hidden gems, trending blockbusters, and timeless classics. Dive in and
        start your cinematic adventure! 🍿🎥✨
      </p>

      <Menubar className="mb-4 flex h-fit w-fit flex-wrap border-2">
        <MenubarMenu>
          <MenubarTrigger>Filter</MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Select>
                <SelectTrigger
                  icon={<LucideChevronRight className="h-4 w-4" />}
                  className="h-auto border-none px-2 py-1.5 hover:bg-accent hover:text-accent-foreground focus:ring-0"
                >
                  Genre
                </SelectTrigger>
                <SelectContent side="right">
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                  <SelectItem>Lol</SelectItem>
                </SelectContent>
              </Select>
            </MenubarItem>
            <MenubarItem>Rating</MenubarItem>
            <MenubarItem>Runtime</MenubarItem>
            <MenubarItem>Released from</MenubarItem>
            <MenubarItem>Released until</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Sort</MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Release date</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Ascending</MenubarItem>
                <MenubarItem>Descending</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger>Rating</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Ascending</MenubarItem>
                <MenubarItem>Descending</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger>Runtime</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Ascending</MenubarItem>
                <MenubarItem>Descending</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSub>
              <MenubarSubTrigger>Popularity</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Ascending</MenubarItem>
                <MenubarItem>Descending</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <label
            htmlFor="search"
            className="group !ml-0 flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium focus-within:bg-accent hover:bg-accent sm:!ml-2"
          >
            Search:
            <input
              id="search"
              placeholder="..."
              className="bg-transparent text-sm font-normal focus-visible:outline-none"
            />
          </label>
        </MenubarMenu>
      </Menubar>

      <MovieList movies={testMovieResponse} />
    </PageContainer>
  );
}
