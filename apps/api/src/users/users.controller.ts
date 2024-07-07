import { Controller, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Request } from "express";
import { contract } from "api-contract";

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @TsRestHandler(contract.users.getCurrent)
  getCurrentUser(@Req() req: Request) {
    return tsRestHandler(contract.users.getCurrent, async () => {
      const user = await this.userService.getCurrentUser(
        req.cookies["access_token"]
      );

      return { status: 200, body: { user } };
    });
  }
}
