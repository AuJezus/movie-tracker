import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { GlobalModule } from "./global.module";
import { MoviesModule } from "./movies/movies.module";
import { ListsModule } from './lists/lists.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GlobalModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    ListsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [{ provide: "APP_GUARD", useClass: JwtAuthGuard }],
})
export class AppModule {}
