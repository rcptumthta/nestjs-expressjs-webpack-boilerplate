import { Injectable } from "@nestjs/common";

@Injectable()
export class ExampleService {
  public hello(): string {
    return "Welcome to the NestJS (ExpressJS) Webpack Boilerplate";
  }
}
