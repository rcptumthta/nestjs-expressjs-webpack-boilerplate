import { EnvironmentValidationSchema, environment, environmentValidation } from "@environment";

import { MiddlewareConsumer, Module, NestModule, OnModuleInit, RequestMethod } from "@nestjs/common";

import * as Joi from "joi";

import { HttpLoggerMiddleware, ResponseTimeMiddleware } from "./middlewares";
import { ApiDocsService } from "./services";

@Module({
  providers: [ApiDocsService],
  exports: [ApiDocsService]
})
export class CoreModule implements NestModule, OnModuleInit {
  private validEnvironment(): void {
    const { error }: Joi.ValidationResult<EnvironmentValidationSchema> = environmentValidation.validate(environment);

    if (error) {
      throw new Error(`Environment validation failed because ${error.message}`);
    }
  }

  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ResponseTimeMiddleware, HttpLoggerMiddleware).forRoutes({ method: RequestMethod.ALL, path: "*" });
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
