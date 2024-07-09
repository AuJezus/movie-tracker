import { Injectable } from "@nestjs/common";
import { db } from "database";

@Injectable()
export class UsersService {
  async getUser(id: number) {
    const user = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });

    return user;
  }
}
