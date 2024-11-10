import * as Joi from "joi";

import { EnvironmentServer, EnvironmentServerValidationSchema } from "./environment-server.model";

export class EnvironmentValidationSchema {
  public readonly profile: Joi.StringSchema;
  public readonly server: Joi.ObjectSchema<EnvironmentServerValidationSchema>;

  public constructor(init: Required<EnvironmentValidationSchema>) {
    Object.assign(this, init);
  }
}

export class Environment {
  public readonly profile: string;
  public readonly server: EnvironmentServer;

  public constructor(init: Required<Environment>) {
    Object.assign(this, init);
  }
}
