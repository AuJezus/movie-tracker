import Link from "next/link";
import { ModeToggle } from "~/components/theme";
import { headingVariants } from "~/components/ui/heading";
import { cn } from "~/lib/utils";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="sticky top-0 z-20 flex items-center border-b-2 border-primary/40 bg-background px-4 py-2">
        <p
          className={cn(
            headingVariants({ level: "h1" }),
            "mb-0 w-full text-2xl",
          )}
        >
          Movie Tracker
        </p>

        <ul className="flex w-fit items-center gap-8 text-nowrap">
          <li>
            <Link
              className="text-lg transition-opacity hover:opacity-85"
              href="/discover"
            >
              Discover
            </Link>
          </li>
          <li>
            <Link
              className="text-lg transition-opacity hover:opacity-85"
              href="/my-library"
            >
              My Library
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>

        <div className="flex w-full justify-end">
          <div className="flex w-64 overflow-hidden">
            <p className="animate-text-scroll w-fit text-nowrap text-sm">
              Please email domantas@ababa.tech, and tell him to hire me!
            </p>
          </div>
        </div>
      </nav>

      {children}
    </>
  );
}

export default AppLayout;
