import { winstonConfiguration } from "@configuration";
import { ApiDocsService } from "@core";
import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { WinstonModule } from "nest-winston";
import { createLogger } from "winston";

import { AppModule } from "./app/app.module";

class Application {
  private static _logger: Logger = new Logger("Bootstrap");

  public static async run(): Promise<void> {
    try {
      const server: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter(), {
        logger: WinstonModule.createLogger({
          instance: createLogger({ ...winstonConfiguration })
        })
      });
      const apiDocsService: ApiDocsService = server.get(ApiDocsService);

      if (["local", "development"].includes(environment.profile)) {
        apiDocsService.run(server);
      }

      await server.init();
      await server.listen(environment.server.port, environment.server.hostname);

      this._logger.log(`Running in ${environment.profile} mode`);
      this._logger.log(`Listening on ${await server.getUrl()}`);
      this._logger.log("Application service started successfully");
    } catch (error) {
      this._logger.error(error);
      this._logger.error("Application failed to start");
    }
  }
}

Application.run();
