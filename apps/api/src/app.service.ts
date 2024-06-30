import { Injectable } from "@nestjs/common";
import { db } from "database";

@Injectable()
export class AppService {
  async getHello() {
    const res = await db.query.posts.findFirst({ columns: { title: true } });

    console.log(res.title);
    return "Hello World!";
  }
}
