import { initContract } from "@ts-rest/core";
import { unauthorizedResponse } from "../contract";
import { z } from "zod";

const c = initContract();

export const authContract = c.router(
  {
    google: {
      method: "GET",
      path: "/google",
      responses: {},
    },
    googleCallback: {
      method: "GET",
      path: "/google/callback",
      responses: {
        200: z.literal("Signed in"),
      },
    },
  },
  {
    commonResponses: {
      ...unauthorizedResponse,
      302: c.otherResponse({
        contentType: "application/json",
        body: z.null(),
      }),
    },
    pathPrefix: "/auth",
  }
);
