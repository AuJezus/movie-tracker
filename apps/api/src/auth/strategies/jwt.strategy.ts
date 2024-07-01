import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { db } from "database";
import { Request } from "express";

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private configService: ConfigService) {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies["access_token"];
      }
      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await db.query.usersTable.findFirst({
      where: (users, { eq }) => eq(users.id, Number(payload.sub)),
    });

    if (!user) throw new UnauthorizedException("Please log in to continue");

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
