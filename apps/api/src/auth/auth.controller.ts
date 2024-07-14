import { AuthService } from "./auth.service";
import { GoogleOAuthGuard } from "./guards/google-oauth.guard";
import { Controller, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from "express";
import { GoogleUser } from "./strategies/google.strategy";
import { TsRestHandler, tsRestHandler } from "@ts-rest/nest";
import { contract } from "api-contract";
import { Public } from "./decorators/public";

@Controller()
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @TsRestHandler(contract.auth.redirectToGoogleLogin)
  @UseGuards(GoogleOAuthGuard)
  async googleAuth() {
    return tsRestHandler(contract.auth.redirectToGoogleLogin, async () => null);
  }

  @TsRestHandler(contract.auth.googleCallback)
  @UseGuards(GoogleOAuthGuard)
  async googleAuthCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return tsRestHandler(contract.auth.googleCallback, async () => {
      const token = await this.authService.signIn(req.user as GoogleUser);

      const redirectUrl = req.cookies["redirect_to"];

      res.cookie("access_token", token, {
        maxAge: 2592000000,
        sameSite: "lax",
        secure: false,
      });

      if (!redirectUrl) return { status: 200, body: "Signed in" };

      res.redirect(redirectUrl);
      return { status: 301, body: null };
    });
  }
}
