import { EnvironmentValidationSchema, environment, environmentValidation } from "@environment";

import { Module, OnModuleInit } from "@nestjs/common";

import * as Joi from "joi";

@Module({})
export class CoreModule implements OnModuleInit {
  private validEnvironment(): void {
    const { error }: Joi.ValidationResult<EnvironmentValidationSchema> = environmentValidation.validate(environment);

    if (error) {
      throw new Error(`Environment validation failed because ${error.message}`);
    }
  }

  public onModuleInit(): void {
    this.validEnvironment();
  }
}
