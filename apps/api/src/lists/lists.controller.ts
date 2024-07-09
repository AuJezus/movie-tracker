import { Controller, Req } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { JwtPayload } from "src/auth/strategies/jwt.strategy";

@Controller()
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    private jwtService: JwtService
  ) {}

  @TsRestHandler(contract.lists.getTypes)
  async getTypes() {
    return tsRestHandler(contract.lists.getTypes, async () => {
      const types = await this.listsService.getTypes();

      return { status: 200, body: types };
    });
  }

  @TsRestHandler(contract.lists.getType)
  async getType() {
    return tsRestHandler(contract.lists.getType, async ({ params }) => {
      const type = await this.listsService.getType(params.id);

      if (!type)
        return { status: 404, body: { message: "Could not find list type" } };

      return { status: 200, body: type };
    });
  }

  @TsRestHandler(contract.lists.getLists)
  async getLists(@Req() req: Request) {
    return tsRestHandler(contract.lists.getLists, async () => {
      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const lists = await this.listsService.getUserLists(id);

      return { status: 200, body: lists };
    });
  }

  @TsRestHandler(contract.lists.getList)
  async getList(@Req() req: Request) {
    return tsRestHandler(contract.lists.getList, async ({ params }) => {
      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const list = await this.listsService.getUserList(id, params.id);

      if (!list)
        return { status: 404, body: { message: "Could not find list" } };

      return { status: 200, body: list };
    });
  }

  @TsRestHandler(contract.lists.addToList)
  async addToList(@Req() req: Request) {
    return tsRestHandler(contract.lists.addToList, async ({ body }) => {
      const { sub: id }: JwtPayload = this.jwtService.decode(
        req.cookies["access_token"]
      );

      const result = await this.listsService.addNewMovie(id, body);

      return { status: 200, body: result };
    });
  }

  @TsRestHandler(contract.lists.editListMovie)
  async editListMovie(@Req() req: Request) {
    return tsRestHandler(
      contract.lists.editListMovie,
      async ({ body, params }) => {
        const { sub: id }: JwtPayload = this.jwtService.decode(
          req.cookies["access_token"]
        );

        const result = await this.listsService.editListMovie(id, {
          ...body,
          id: params.id,
        });

        return { status: 200, body: result };
      }
    );
  }
}
