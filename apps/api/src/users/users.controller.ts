import { Controller, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { Request } from "express";
import { contract } from "api-contract";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/auth/strategies/jwt.strategy";

@Controller()
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService
  ) {}

  @TsRestHandler(contract.users.getCurrent)
  getCurrentUser(@Req() req: Request) {
    return tsRestHandler(contract.users.getCurrent, async () => {
      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const user = await this.userService.getUser(id);

      return { status: 200, body: { user } };
    });
  }
}
