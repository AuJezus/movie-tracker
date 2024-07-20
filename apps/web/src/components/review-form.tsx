"use client";

import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { headingVariants } from "./ui/heading";
import { cn } from "~/lib/utils";
import { BiEdit, BiStar } from "react-icons/bi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { queryApiClient } from "~/lib/api";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  rating: z.coerce.number().min(0).max(10),
  review: z.string().min(50),
});

function ReviewForm({
  className,
  movieId,
}: {
  className?: string;
  movieId: number;
}) {
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const { data: reviewsRes } =
    queryApiClient.reviews.getReviewByMovieId.useQuery(
      ["reviews", "movie", movieId],
      { params: { movieId: movieId.toString() } },
    );
  const review = reviewsRes?.status === 200 ? reviewsRes.body : undefined;

  const { isLoading: isLoadingAdd, mutateAsync: mutateAddAsync } =
    queryApiClient.reviews.addReview.useMutation();
  const { isLoading: isLoadingEdit, mutateAsync: mutateEditAsync } =
    queryApiClient.reviews.editReview.useMutation();
  const isMutating = isLoadingAdd || isLoadingEdit;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!review) {
      const addRes = await mutateAddAsync({
        body: { ...values, movieId: movieId },
      });
      if (addRes.status === 200) {
        queryClient.invalidateQueries(["reviews", "movie", movieId]);
        setIsEdit(false);
      }
    } else {
      const editRes = await mutateEditAsync({
        params: { reviewId: review.id.toString() },
        body: { id: review.id, ...values },
      });
      if (editRes.status === 200) {
        queryClient.invalidateQueries(["reviews", "movie", movieId]);
        setIsEdit(false);
      }
    }
  }

  useEffect(() => {
    if (!!review) {
      form.setValue("rating", review.rating);
      form.setValue("review", review.review);
    }
  }, [review]);

  return (
    <div className={cn("overflow-hidden px-1", className)}>
      <div className="mb-4 flex items-center justify-between">
        <p className={cn(headingVariants(), "text-3xl")}>Your Review</p>
        {!!review && (
          <>
            <div className="flex w-fit items-center gap-2 rounded-md border-2 bg-primary px-2 py-1 text-primary-foreground">
              <BiStar /> {review?.rating?.toFixed(2)}
            </div>

            <BiEdit
              onClick={() => setIsEdit((isEdit) => !isEdit)}
              className="text-3xl text-primary"
            />
          </>
        )}
      </div>

      {isEdit && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write your review..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className={cn(isMutating && "animate-pulse")}
              disabled={isMutating}
              type="submit"
            >
              {isMutating ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      )}

      {!isEdit &&
        (!!review ? (
          <p className="break-words">{review.review}</p>
        ) : (
          <Button onClick={() => setIsEdit(true)}>Write a review</Button>
        ))}
    </div>
  );
}

export default ReviewForm;
