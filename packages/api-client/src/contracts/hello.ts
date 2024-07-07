import { initContract } from "@ts-rest/core";

const c = initContract();

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
