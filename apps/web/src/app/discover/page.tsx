import Image from "next/image";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
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
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { BiCalendarStar, BiStar, BiTime } from "react-icons/bi";
import { MdMovieEdit } from "react-icons/md";

const testMovieResponse = {
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
      genre_ids: [16, 10751, 12, 35],
      id: 1022789,
      original_language: "en",
      original_title: "Inside Out 2",
      overview:
        "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
      popularity: 7298.32,
      poster_path: "/oxxqiyWrnM0XPnBtVe9TgYWnPxT.jpg",
      release_date: "2024-06-11",
      title: "Inside Out 2",
      video: false,
      vote_average: 7.742,
      vote_count: 816,
    },
    {
      adult: false,
      backdrop_path: "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
      genre_ids: [878, 12, 28],
      id: 653346,
      original_language: "en",
      original_title: "Kingdom of the Planet of the Apes",
      overview:
        "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
      popularity: 3152.814,
      poster_path: "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
      release_date: "2024-05-08",
      title: "Kingdom of the Planet of the Apes",
      video: false,
      vote_average: 6.867,
      vote_count: 1227,
    },
    {
      adult: false,
      backdrop_path: "/j29ekbcLpBvxnGk6LjdTc2EI5SA.jpg",
      genre_ids: [16, 10751, 12, 18, 35],
      id: 150540,
      original_language: "en",
      original_title: "Inside Out",
      overview:
        "From an adventurous balloon ride above the clouds to a monster-filled metropolis, Academy Award®-winning director Pete Docter (“Monsters, Inc.,” “Up”) has taken audiences to unique and imaginative places. In Disney and Pixar’s original movie “ Inside Out,” he will take us to the most extraordinary location of all—inside the mind.",
      popularity: 2435.848,
      poster_path: "/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
      release_date: "2015-06-17",
      title: "Inside Out",
      video: false,
      vote_average: 7.915,
      vote_count: 20854,
    },
    {
      adult: false,
      backdrop_path: "/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",
      genre_ids: [28, 80, 53, 35],
      id: 573435,
      original_language: "en",
      original_title: "Bad Boys: Ride or Die",
      overview:
        "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
      popularity: 1919.105,
      poster_path: "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
      release_date: "2024-06-05",
      title: "Bad Boys: Ride or Die",
      video: false,
      vote_average: 7.02,
      vote_count: 428,
    },
    {
      adult: false,
      backdrop_path: "/iTWrsOVsUqcwYSxrpINNs3hG2nC.jpg",
      genre_ids: [53, 27, 28, 9648],
      id: 1001311,
      original_language: "fr",
      original_title: "Sous la Seine",
      overview:
        "In the Summer of 2024, Paris is hosting the World Triathlon Championships on the Seine for the first time. Sophia, a brilliant scientist, learns from Mika, a young environmental activist, that a large shark is swimming deep in the river. To avoid a bloodbath at the heart of the city, they have no choice but to join forces with Adil, the Seine river police commander.",
      popularity: 1723.728,
      poster_path: "/flX5OSC1NAKHqjLIZL5YcyxtSXh.jpg",
      release_date: "2024-06-05",
      title: "Under Paris",
      video: false,
      vote_average: 6.008,
      vote_count: 716,
    },
    {
      adult: false,
      backdrop_path: "/fZv4EldEPurSz0d2uVIoL4Sng8x.jpg",
      genre_ids: [28, 18, 53],
      id: 1016346,
      original_language: "bn",
      original_title: "MR-9: Do or Die",
      overview:
        "Masud Rana is a Secret Agent with code name MR-9 of the Bangladesh Counter Intelligence Agency",
      popularity: 1713.256,
      poster_path: "/geAWZUshBg4hS8TIeLOEhJbglpo.jpg",
      release_date: "2023-08-25",
      title: "MR-9: Do or Die",
      video: false,
      vote_average: 6.6,
      vote_count: 72,
    },
    {
      adult: false,
      backdrop_path: "/nxxCPRGTzxUH8SFMrIsvMmdxHti.jpg",
      genre_ids: [35, 14, 10751],
      id: 639720,
      original_language: "en",
      original_title: "IF",
      overview:
        "A young girl who goes through a difficult experience begins to see everyone's imaginary friends who have been left behind as their real-life friends have grown up.",
      popularity: 1655.174,
      poster_path: "/xbKFv4KF3sVYuWKllLlwWDmuZP7.jpg",
      release_date: "2024-05-08",
      title: "IF",
      video: false,
      vote_average: 7.473,
      vote_count: 395,
    },
    {
      adult: false,
      backdrop_path: "/jvPMJ2zM92jfXxVEFsqP1MMrLaO.jpg",
      genre_ids: [878, 28, 12],
      id: 823464,
      original_language: "en",
      original_title: "Godzilla x Kong: The New Empire",
      overview:
        "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
      popularity: 1648.219,
      poster_path: "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
      release_date: "2024-03-27",
      title: "Godzilla x Kong: The New Empire",
      video: false,
      vote_average: 7.215,
      vote_count: 2910,
    },
    {
      adult: false,
      backdrop_path: "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
      genre_ids: [10752, 28, 18],
      id: 929590,
      original_language: "en",
      original_title: "Civil War",
      overview:
        "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
      popularity: 1454.855,
      poster_path: "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
      release_date: "2024-04-10",
      title: "Civil War",
      video: false,
      vote_average: 7.011,
      vote_count: 1707,
    },
    {
      adult: false,
      backdrop_path: "/wNAhuOZ3Zf84jCIlrcI6JhgmY5q.jpg",
      genre_ids: [28, 12, 878],
      id: 786892,
      original_language: "en",
      original_title: "Furiosa: A Mad Max Saga",
      overview:
        "As the world fell, young Furiosa is snatched from the Green Place of Many Mothers and falls into the hands of a great Biker Horde led by the Warlord Dementus. Sweeping through the Wasteland they come across the Citadel presided over by The Immortan Joe. While the two Tyrants war for dominance, Furiosa must survive many trials as she puts together the means to find her way home.",
      popularity: 1106.883,
      poster_path: "/iADOJ8Zymht2JPMoy3R7xceZprc.jpg",
      release_date: "2024-05-22",
      title: "Furiosa: A Mad Max Saga",
      video: false,
      vote_average: 7.6,
      vote_count: 1046,
    },
    {
      adult: false,
      backdrop_path: "/vblTCXOWUQGSc837vgbhDRi4HSc.jpg",
      genre_ids: [28, 80, 35, 53],
      id: 955555,
      original_language: "ko",
      original_title: "The Roundup: Punishment",
      overview:
        "Detective Ma Seok-do changes his affiliation from the Geumcheon Police Station to the Metropolitan Investigation Team, in order to eradicate Japanese gangsters who enter Korea to commit heinous crimes.",
      popularity: 1083.308,
      poster_path: "/lW6IHrtaATxDKYVYoQGU5sh0OVm.jpg",
      release_date: "2023-05-31",
      title: "The Roundup: No Way Out",
      video: false,
      vote_average: 7.207,
      vote_count: 323,
    },
    {
      adult: false,
      backdrop_path: "/g5Ha2DhXIuxsUl4gaDnbw3jOAlo.jpg",
      genre_ids: [28],
      id: 1115623,
      original_language: "en",
      original_title: "The Last Kumite",
      overview:
        "When Karate champion Michael Rivers wins the last tournament of his career, shady businessman Ron Hall offers him the opportunity to fight in an illegal Kumite in Bulgaria against the world’s best martial artists.  When Michael declines, Hall has his daughter kidnapped and, in order to rescue her, Rivers is left with no choice but to compete in the deadly tournament. Arriving in Bulgaria, he finds out that he is not the only fighter whose loved one was taken. Rivers enlists the help of trainers Master Loren, and Julie Jackson but will it be enough for him to win the tournament and save his daughter’s life?",
      popularity: 945.08,
      poster_path: "/zDkaJgsPoSqa2cMe2hW2HAfyWwO.jpg",
      release_date: "2024-05-09",
      title: "The Last Kumite",
      video: false,
      vote_average: 7.245,
      vote_count: 53,
    },
    {
      adult: false,
      backdrop_path: "/SI22DaQXIfDvLrNBHGpSVShrsC.jpg",
      genre_ids: [16, 878, 10751, 28],
      id: 829402,
      original_language: "en",
      original_title: "Ultraman: Rising",
      overview:
        "With Tokyo under attack from kaiju, Ultraman discovers his greatest challenge isn’t fighting giant monsters - it’s raising one.",
      popularity: 911.281,
      poster_path: "/j886YEkIUsiImY53px5VHKD4lRa.jpg",
      release_date: "2024-06-14",
      title: "Ultraman: Rising",
      video: false,
      vote_average: 8.373,
      vote_count: 118,
    },
    {
      adult: false,
      backdrop_path: "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
      genre_ids: [16, 28, 10751, 35, 14],
      id: 1011985,
      original_language: "en",
      original_title: "Kung Fu Panda 4",
      overview:
        "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
      popularity: 898.247,
      poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
      release_date: "2024-03-02",
      title: "Kung Fu Panda 4",
      video: false,
      vote_average: 7.128,
      vote_count: 2112,
    },
    {
      adult: false,
      backdrop_path: "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
      genre_ids: [878, 28],
      id: 614933,
      original_language: "en",
      original_title: "Atlas",
      overview:
        "A brilliant counterterrorism analyst with a deep distrust of AI discovers it might be her only hope when a mission to capture a renegade robot goes awry.",
      popularity: 877.373,
      poster_path: "/bcM2Tl5HlsvPBnL8DKP9Ie6vU4r.jpg",
      release_date: "2024-05-23",
      title: "Atlas",
      video: false,
      vote_average: 6.809,
      vote_count: 888,
    },
    {
      adult: false,
      backdrop_path: "/oZDRuGHhe5uY8wBqFJcJZT9kdvJ.jpg",
      genre_ids: [27, 9648, 14],
      id: 1086747,
      original_language: "en",
      original_title: "The Watchers",
      overview:
        "A young artist gets stranded in an extensive, immaculate forest in western Ireland, where, after finding shelter, she becomes trapped alongside three strangers, stalked by mysterious creatures each night.",
      popularity: 851.398,
      poster_path: "/vZVEUPychdvZLrTNwWErr9xZFmu.jpg",
      release_date: "2024-06-06",
      title: "The Watchers",
      video: false,
      vote_average: 6.195,
      vote_count: 174,
    },
    {
      adult: false,
      backdrop_path: "/gGmf3CyHdXvaZtcun0DvU1WSNft.jpg",
      genre_ids: [28, 14, 12],
      id: 626412,
      original_language: "ko",
      original_title: "외계+인 2부",
      overview:
        "Ean has a critical mission to return to the future to save everyone. However, she becomes trapped in the distant past while trying to prevent the escape of alien prisoners who are locked up in the bodies of humans. Meanwhile, Muruk, who helps Ean escape various predicaments, is unnerved when he begins sensing the presence of a strange being in his body. Traveling through the centuries, they are trying to prevent the explosion of the haava.",
      popularity: 833.584,
      poster_path: "/4RClncz0GTKPZzSAcAalHCw0h3g.jpg",
      release_date: "2024-01-10",
      title: "Alienoid: Return to the Future",
      video: false,
      vote_average: 6.713,
      vote_count: 314,
    },
    {
      adult: false,
      backdrop_path: "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
      genre_ids: [27],
      id: 719221,
      original_language: "en",
      original_title: "Tarot",
      overview:
        "When a group of friends recklessly violate the sacred rule of Tarot readings, they unknowingly unleash an unspeakable evil trapped within the cursed cards. One by one, they come face to face with fate and end up in a race against death.",
      popularity: 816.846,
      poster_path: "/gAEUXC37vl1SnM7PXsHTF23I2vq.jpg",
      release_date: "2024-05-01",
      title: "Tarot",
      video: false,
      vote_average: 6.6,
      vote_count: 576,
    },
    {
      adult: false,
      backdrop_path: "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
      genre_ids: [28, 35],
      id: 746036,
      original_language: "en",
      original_title: "The Fall Guy",
      overview:
        "Fresh off an almost career-ending accident, stuntman Colt Seavers has to track down a missing movie star, solve a conspiracy and try to win back the love of his life while still doing his day job.",
      popularity: 802.561,
      poster_path: "/aBkqu7EddWK7qmY4grL4I6edx2h.jpg",
      release_date: "2024-04-24",
      title: "The Fall Guy",
      video: false,
      vote_average: 7.288,
      vote_count: 1379,
    },
    {
      adult: false,
      backdrop_path: "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
      genre_ids: [16, 10751, 35, 28],
      id: 519182,
      original_language: "en",
      original_title: "Despicable Me 4",
      overview:
        "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, and the family is forced to go on the run.",
      popularity: 711.785,
      poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      release_date: "2024-06-20",
      title: "Despicable Me 4",
      video: false,
      vote_average: 9.024,
      vote_count: 41,
    },
  ],
  total_pages: 44808,
  total_results: 896141,
};

export default async function DiscoverPage() {
  return (
    <main className="mx-auto max-w-[1200px] px-2 sm:px-3">
      <h1 className="mb-6 text-5xl font-medium underline decoration-primary">
        Discover New Movies
      </h1>

      <p className="mb-8 max-w-4xl">
        Explore a vast collection of movies from all genres and eras. Find
        hidden gems, trending blockbusters, and timeless classics. Dive in and
        start your cinematic adventure! 🍿🎥✨
      </p>

      <Menubar className="mb-4 w-fit border-2">
        <MenubarMenu>
          <MenubarTrigger>Filter</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              New Window <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Share</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Email link</MenubarItem>
                <MenubarItem>Messages</MenubarItem>
                <MenubarItem>Notes</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Sort</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
            <MenubarCheckboxItem checked>
              Always Show Full URLs
            </MenubarCheckboxItem>
            <MenubarSeparator />
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Profiles</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
              <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
            </MenubarRadioGroup>
            <MenubarSeparator />
            <MenubarItem inset>Edit...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Add Profile...</MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <label
            htmlFor="search"
            className="group flex items-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium focus-within:bg-accent hover:bg-accent"
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

      <div className="mx-auto grid max-w-sm grid-cols-1 gap-4 sm:max-w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testMovieResponse.results.map((movie) => (
          <div
            key={movie.id}
            className="group relative flex aspect-[6/8] flex-col justify-between overflow-hidden rounded-md border-2 transition-all hover:scale-105 hover:border-primary has-[[data-state=open]]:scale-105 has-[[data-state=open]]:border-primary"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              fill
              alt="a"
              className="-z-20 object-cover"
            />

            {/* Darken effect */}
            <div className="absolute -z-10 h-full w-full bg-gradient-to-t from-background to-transparent to-30%"></div>
            <div className="absolute -z-10 h-full w-full translate-y-full bg-gradient-to-t from-background from-70% to-transparent opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-30 group-has-[[data-state=open]]:translate-y-0 group-has-[[data-state=open]]:opacity-30"></div>

            <div className="mt-2 flex flex-col gap-2">
              <div className="flex w-fit items-center gap-2 rounded-r-md bg-primary px-3 py-1.5 text-primary-foreground transition-transform">
                <BiStar className="text-lg" /> 7.76/10
              </div>

              <div className="flex w-fit translate-x-full items-center gap-2 self-end rounded-l-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform group-hover:translate-x-0 group-has-[[data-state=open]]:translate-x-0">
                <BiTime className="text-lg" /> 1h 35mins
              </div>

              <Select>
                <SelectTrigger
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "w-fit -translate-x-full gap-2 rounded-l-none border-0 transition-transform focus-within:ring-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 group-hover:translate-x-0 group-has-[[data-state=open]]:translate-x-0",
                  )}
                  icon={<MdMovieEdit />}
                >
                  <SelectValue placeholder="Add to list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Completed</SelectItem>
                  <SelectItem value="dark">Plan to watch</SelectItem>
                  <SelectItem value="system">Dropped</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex w-fit translate-x-full items-center gap-2 self-end rounded-l-md bg-secondary px-3 py-1.5 text-secondary-foreground transition-transform group-hover:translate-x-0 group-has-[[data-state=open]]:translate-x-0">
                <BiCalendarStar className="text-lg" /> 2024-06-23
              </div>
            </div>

            <p className="p-2 font-semibold">{movie.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
