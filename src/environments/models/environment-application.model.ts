import * as Joi from "joi";

export class EnvironmentApplicationValidationSchema {
  public readonly version: Joi.StringSchema;
  public readonly name: Joi.StringSchema;

  public constructor(init: Required<EnvironmentApplicationValidationSchema>) {
    Object.assign(this, init);
  }
}

export class EnvironmentApplication {
  public readonly version: string;
  public readonly name: string;

  public constructor(init: Required<EnvironmentApplication>) {
    Object.assign(this, init);
  }
}
