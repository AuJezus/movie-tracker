import { forwardRef } from "react";
import { cn } from "~/lib/utils";

const PageContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <main
      className={cn("mx-auto my-12 max-w-[1200px] px-2 sm:px-3", className)}
      ref={ref}
      {...props}
    >
      {children}
    </main>
  );
});
PageContainer.displayName = "PageContainer";

export default PageContainer;
