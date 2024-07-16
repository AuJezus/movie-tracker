import { Controller, Req } from "@nestjs/common";
import { ListsService } from "./lists.service";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";

@Controller()
export class ListsController {
  constructor(
    private readonly listsService: ListsService,
    private readonly authService: AuthService
  ) {}

  @TsRestHandler(contract.lists.getLists)
  async getLists(@Req() req: Request) {
    return tsRestHandler(contract.lists.getLists, async () => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const lists = await this.listsService.getLists(userId);

      return { status: 200, body: lists };
    });
  }

  @TsRestHandler(contract.lists.getList)
  async getList(@Req() req: Request) {
    return tsRestHandler(contract.lists.getList, async ({ params }) => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const list = await this.listsService.getList(userId, params.listTypeId);

      if (!list)
        return {
          status: 404,
          body: { message: "Could not find list with given typeId" },
        };

      return { status: 200, body: list };
    });
  }

  @TsRestHandler(contract.lists.addToList)
  async addToList(@Req() req: Request) {
    return tsRestHandler(contract.lists.addToList, async ({ body }) => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const listMovie = await this.listsService.addToList(userId, body);

      return { status: 200, body: listMovie };
    });
  }

  @TsRestHandler(contract.lists.editMovie)
  async editListMovie(@Req() req: Request) {
    return tsRestHandler(contract.lists.editMovie, async ({ body, params }) => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const updatedListMovie = await this.listsService.editMovie(userId, {
        ...body,
        id: params.listMovieId,
      });

      if (!updatedListMovie)
        return {
          status: 404,
          body: { message: "Could not find listMovie with given listMovieId" },
        };

      return { status: 200, body: updatedListMovie };
    });
  }

  @TsRestHandler(contract.lists.deleteMovie)
  async deleteListMovie(@Req() req: Request) {
    return tsRestHandler(contract.lists.deleteMovie, async ({ params }) => {
      const userId = this.authService.getUserIdFromJwt(req.cookies);

      const deletedListMovie = await this.listsService.deleteMovie(
        userId,
        params.listMovieId
      );

      if (!deletedListMovie)
        return {
          status: 404,
          body: { message: "Could not find listMovie with given listMovieId" },
        };

      return { status: 200, body: deletedListMovie };
    });
  }

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
      const type = await this.listsService.getType(params.listTypeId);

      if (!type)
        return {
          status: 404,
          body: { message: "Could not find type with given typeId" },
        };

      return { status: 200, body: type };
    });
  }
}
