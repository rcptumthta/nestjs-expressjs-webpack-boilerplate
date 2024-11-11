import * as Joi from "joi";

export class EnvironmentLoggerValidationSchema {
  public readonly level: Joi.StringSchema;

  public constructor(init: Required<EnvironmentLoggerValidationSchema>) {
    Object.assign(this, init);
  }
}

export class EnvironmentLogger {
  public readonly level: string;

  public constructor(init: Required<EnvironmentLogger>) {
    Object.assign(this, init);
  }
}
