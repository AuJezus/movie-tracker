import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "~/lib/utils";

export const headingVariants = cva(
  "font-medium capitalize underline decoration-primary",
  {
    variants: {
      level: {
        h1: "mb-6 text-4xl sm:text-5xl",
        h2: "mb-6 text-4xl",
        h3: "",
        h4: "",
        h5: "",
        h6: "",
      },
    },
  },
);

const Heading = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  }
>(({ level = "h2", className, children, ...props }, ref) => {
  const Title = level;

  return (
    <Title
      ref={ref}
      className={cn(headingVariants({ level }), className)}
      {...props}
    >
      {children}
    </Title>
  );
});
Heading.displayName = "Heading";

export default Heading;
