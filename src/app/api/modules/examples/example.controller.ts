import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

import { ExampleService } from "./example.service";

@Controller()
export class ExampleController {
  private readonly _server: ExampleService;

  public constructor(server: ExampleService) {
    this._server = server;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public index(): string {
    return this._server.hello();
  }
}
