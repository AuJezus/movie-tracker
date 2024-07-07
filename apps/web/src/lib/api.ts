import { initClient } from "@ts-rest/core";
import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "api-contract";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const initApiClient = (cookies: ReadonlyRequestCookies) =>
  initClient(contract, {
    baseUrl: "http://localhost:3001",
    baseHeaders: { Cookie: cookies.toString() },
    throwOnUnknownStatus: true,
  });

export const queryApiClient = initQueryClient(contract, {
  baseUrl: "http://localhost:3001",
  credentials: "include",
  baseHeaders: { "Access-Control-Allow-Origin": "*" },
  throwOnUnknownStatus: true,
});
