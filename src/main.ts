import { winstonConfiguration } from "@configuration";
import { environment } from "@environment";

import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";

import { WinstonModule } from "nest-winston";
import { createLogger } from "winston";

import { AppModule } from "./app/app.module";

class Application {
  private static logger: Logger = new Logger("Bootstrap");

  public static async run(): Promise<void> {
    try {
      const server: NestExpressApplication = await NestFactory.create(AppModule, new ExpressAdapter(), {
        logger: WinstonModule.createLogger({
          instance: createLogger({ ...winstonConfiguration })
        })
      });

      await server.init();
      await server.listen(environment.server.port, environment.server.hostname);

      this.logger.log(`Running in ${environment.profile} mode`);
      this.logger.log(`Listening on ${await server.getUrl()}`);
      this.logger.log("Application service started successfully");
    } catch (error) {
      this.logger.error(error);
      this.logger.error("Application failed to start");
    }
  }
}

Application.run();
