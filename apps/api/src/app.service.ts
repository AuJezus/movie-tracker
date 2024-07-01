import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  async sayHello() {
    return { message: "Welcome to movie-tracker api" };
  }
}
