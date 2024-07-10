import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export type GoogleUser = {
  provider: "google";
  providerId: string;
  email: string;
  name: string;
  lastName: string;
  picture: string;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get("GOOGLE_CLIENT_ID"),
      clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
      callbackURL: "http://localhost:3001/auth/google/callback",
      scope: ["email", "profile"],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ): Promise<any> {
    const { id, name, emails, photos } = profile;

    const profilePicture = photos[0].value.split("=")[0];

    const user = {
      provider: "google",
      providerId: id,
      email: emails[0].value,
      name: name.givenName,
      lastName: name.familyName,
      picture: profilePicture,
    } as GoogleUser;

    done(null, user);
  }
}
