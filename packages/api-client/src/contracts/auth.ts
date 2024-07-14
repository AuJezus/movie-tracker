import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

export const authContract = c.router({
  redirectToGoogleLogin: {
    method: "GET",
    path: "/google",
    responses: {
      302: z.undefined(),
    },
  },
  googleCallback: {
    method: "GET",
    path: "/google/callback",
    responses: {
      200: z.literal("Signed in"),
      302: z.undefined(),
    },
  },
});
