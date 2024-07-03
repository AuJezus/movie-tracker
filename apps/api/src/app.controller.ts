import { Controller } from "@nestjs/common";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { helloContract } from "api-contract";

@Controller()
export class AppController {
  @TsRestHandler(helloContract.hello)
  SayHello() {
    return tsRestHandler(helloContract.hello, async () => ({
      status: 200,
      body: { message: "Welcome to movie-tracker api" },
    }));
  }
}
