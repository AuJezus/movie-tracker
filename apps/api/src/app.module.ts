import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "@nestjs/config";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { GlobalModule } from "./global.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [{ provide: "APP_GUARD", useClass: JwtAuthGuard }],
})
export class AppModule {}
