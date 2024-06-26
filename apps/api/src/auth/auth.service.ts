import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { db, usersTable } from "database";
import { generateFromEmail } from "unique-username-generator";
import { GoogleUser } from "./strategies/google.strategy";

export type JWTPayload = {
  sub: string | number;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(payload: JWTPayload) {
    return this.jwtService.sign(payload);
  }

  async signIn(user: GoogleUser) {
    if (!user) {
      throw new BadRequestException("Unauthenticated");
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    return this.generateJwt({
      sub: userExists.id,
      email: userExists.email,
    });
  }

  async registerUser(user: GoogleUser) {
    try {
      const username = generateFromEmail(user.email);

      const [newUser] = await db
        .insert(usersTable)
        .values({ ...user, username })
        .returning();

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException("Error registering user");
    }
  }

  async findUserByEmail(email: string) {
    const user = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
