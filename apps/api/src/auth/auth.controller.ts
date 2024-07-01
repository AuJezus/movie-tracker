import { AuthService } from "./auth.service";
import { GoogleOAuthGuard } from "./guards/google-oauth.guard";
import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { Request, Response } from "express";
import { GoogleUser } from "./strategies/google.strategy";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google")
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {}

  @Get("google/callback")
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.signIn(req.user as GoogleUser);

    res.cookie("access_token", token, {
      maxAge: 2592000000,
      sameSite: true,
      secure: false,
    });

    return res.status(HttpStatus.OK).send("Signed in");
  }

  @Get("test")
  @UseGuards(JwtAuthGuard)
  authTest() {
    return "You are signed in";
  }
}
