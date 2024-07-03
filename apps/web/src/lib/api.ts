import { initClient } from "@ts-rest/core";
import { contract } from "api-contract";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const initApiClient = (cookies: ReadonlyRequestCookies) => {
  return initClient(contract, {
    baseUrl: "http://localhost:3001",
    baseHeaders: { Cookie: cookies.toString() },
    throwOnUnknownStatus: true,
  });
};
