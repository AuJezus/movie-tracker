import { Controller, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { userContract } from "api-contract";
import { Request } from "express";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @TsRestHandler(userContract.getCurrent)
  getCurrentUser(@Req() req: Request) {
    return tsRestHandler(userContract.getCurrent, async () => {
      const user = await this.userService.getCurrentUser(
        req.cookies["access_token"]
      );

      return { status: 200, body: { user } };
    });
  }
}
