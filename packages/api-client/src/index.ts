import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { User } from "database";

const c = initContract();

const unauthorizedResponse = {
  401: c.otherResponse({
    contentType: "application/json",
    body: c.type<{
      message: "Unauthorized";
      statusCode: 401;
    }>(),
  }),
};

export const helloContract = c.router({
  hello: {
    method: "GET",
    path: "/",
    responses: {
      200: c.type<{
        message: string;
      }>(),
    },
  },
});

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

export const userContract = c.router(
  {
    getCurrent: {
      method: "GET",
      path: "/current",
      responses: {
        200: c.type<{ user: User }>(),
      },
    },
  },
  { commonResponses: { ...unauthorizedResponse }, pathPrefix: "/user" }
);

export const contract = {
  hello: helloContract,
  auth: authContract,
  user: userContract,
};
