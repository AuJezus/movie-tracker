"use client";

import Link from "next/link";
import { ModeToggle } from "~/components/theme";
import { headingVariants } from "~/components/ui/heading";
import { cn } from "~/lib/utils";
import { useMediaQuery } from "~/lib/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

function NavBar() {
  const isDekstop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState<boolean>(false);

  if (isDekstop)
    return (
      <nav className="sticky top-0 z-20 flex items-center border-b-2 border-primary/40 bg-background px-4 py-2">
        <PageTitle />

        <Links />

        <ScrollText />
      </nav>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <MenuIcon className="m-2 ml-auto h-10 w-10" />
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-around p-4">
        <PageTitle />

        <Links onClick={() => setOpen(false)} />

        <ScrollText />
      </DrawerContent>
    </Drawer>
  );
}

const PageTitle = () => (
  <p
    className={cn(headingVariants({ level: "h1" }), "mb-0 text-2xl md:w-full")}
  >
    Movie Tracker
  </p>
);

const Links = ({ onClick }: { onClick?: () => void }) => (
  <ul className="flex w-fit flex-col items-center gap-4 text-nowrap md:flex-row md:gap-8">
    <li>
      <Link
        className="text-lg transition-opacity hover:opacity-85"
        href="/discover"
        onClick={onClick}
      >
        Discover
      </Link>
    </li>
    <li>
      <Link
        className="text-lg transition-opacity hover:opacity-85"
        href="/my-library"
        onClick={onClick}
      >
        My Library
      </Link>
    </li>
    <li>
      <ModeToggle />
    </li>
  </ul>
);

const ScrollText = () => (
  <div className="flex w-full justify-end md:hidden lg:flex">
    <div className="flex w-full overflow-hidden md:w-64">
      <p className="w-fit animate-text-scroll text-nowrap text-sm">
        Please email domantas@ababa.tech, and tell him to hire me!
      </p>
    </div>
  </div>
);

export default NavBar;
