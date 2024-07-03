import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { db } from "database";
import { JwtPayload } from "src/auth/strategies/jwt.strategy";

@Injectable()
export class UserService {
  constructor(private jwtService: JwtService) {}

  async getCurrentUser(accessToken: string) {
    const { sub, email }: JwtPayload = this.jwtService.decode(accessToken);

    const user = await db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.id, sub) && eq(user.email, email),
    });

    return user;
  }
}
