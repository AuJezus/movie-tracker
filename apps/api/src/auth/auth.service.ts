import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { db, users } from "database";
import { generateFromEmail } from "unique-username-generator";
import { GoogleUser } from "./strategies/google.strategy";
import { JwtPayload } from "./strategies/jwt.strategy";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateJwt(payload: JwtPayload) {
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
        .insert(users)
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
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!user) {
      return null;
    }

    return user;
  }

  getUserIdFromJwt(cookies: Record<string, any>) {
    const { sub: userId }: JwtPayload = this.jwtService.decode(
      cookies["access_token"]
    );

    return userId;
  }
}
