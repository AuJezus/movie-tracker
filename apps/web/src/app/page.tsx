import { Button } from "~/components/ui/button";
import mjPopcornGif from "../../public/mj-popcorn.webp";
import Image from "next/image";
import Heading from "~/components/ui/heading";

export default function HomePage() {
  return (
    <main className="mx-auto flex h-dvh max-w-xl flex-col items-center justify-center p-2 text-center md:max-w-2xl">
      <Heading level="h1" className="mb-8 text-6xl md:text-7xl">
        Movie Tracker
      </Heading>

      <p className="mb-6 text-sm md:text-lg">
        Discover, add, and rate movies! Create custom lists, share favorites,
        and dive into endless cinematic adventures. Let the movie magic begin!
        🍿🎥✨
      </p>

      <div className="mb-12 flex gap-8">
        <Button size="lg">Sign In</Button>
        <Button variant="secondary" size="lg">
          Sign Up
        </Button>
      </div>

      <Image
        className="max-w-fit dark:brightness-75"
        src={mjPopcornGif}
        alt="Michael Jackson eating popcorn"
      />
    </main>
  );
}
