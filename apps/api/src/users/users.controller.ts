import { Controller, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Request } from "express";
import { contract } from "api-contract";
import { AuthService } from "src/auth/auth.service";

@Controller()
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService
  ) {}

  @TsRestHandler(contract.users.getCurrent)
  async getCurrentUser(@Req() req: Request) {
    return tsRestHandler(contract.users.getCurrent, async () => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const user = await this.userService.getUser(userId);

      return { status: 200, body: { user } };
    });
  }

  @TsRestHandler(contract.users.getStats)
  async getStats(@Req() req: Request) {
    return tsRestHandler(contract.users.getStats, async () => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const stats = await this.userService.getStats(userId);

      return { status: 200, body: stats };
    });
  }
}
