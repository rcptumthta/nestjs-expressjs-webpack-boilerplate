import * as Joi from "joi";

export class EnvironmentServerValidationSchema {
  public readonly port: Joi.NumberSchema;
  public readonly hostname: Joi.StringSchema;

  public constructor(init: Required<EnvironmentServerValidationSchema>) {
    Object.assign(this, init);
  }
}

export class EnvironmentServer {
  public readonly port: number;
  public readonly hostname: string;

  public constructor(init: Required<EnvironmentServer>) {
    Object.assign(this, init);
  }
}
