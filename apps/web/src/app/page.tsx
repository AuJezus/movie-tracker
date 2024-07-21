import { Button } from "~/components/ui/button";
import mjPopcornGif from "../../public/mj-popcorn.webp";
import Image from "next/image";
import Heading from "~/components/ui/heading";
import { authenticateWithGoogle } from "~/server/actions";
import { BiLogoGoogle } from "react-icons/bi";

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
        <form action={authenticateWithGoogle}>
          <Button size="lg" className="gap-2">
            Continue with <BiLogoGoogle className="text-xl" />
          </Button>
        </form>
      </div>

      <Image
        className="w-full max-w-sm flex-shrink dark:brightness-75"
        src={mjPopcornGif}
        alt="Michael Jackson eating popcorn"
        unoptimized
      />
    </main>
  );
}
