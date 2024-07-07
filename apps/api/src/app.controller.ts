import { Controller } from "@nestjs/common";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";

@Controller()
export class AppController {
  @TsRestHandler(contract.hello.hello)
  SayHello() {
    return tsRestHandler(contract.hello.hello, async () => ({
      status: 200,
      body: { message: "Welcome to movie-tracker api" },
    }));
  }
}
