import * as Joi from "joi";

import { EnvironmentApplication, EnvironmentApplicationValidationSchema } from "./environment-application.model";
import { EnvironmentLogger, EnvironmentLoggerValidationSchema } from "./environment-logger.model";
import { EnvironmentServer, EnvironmentServerValidationSchema } from "./environment-server.model";

export class EnvironmentValidationSchema {
  public readonly profile: Joi.StringSchema;
  public readonly application: Joi.ObjectSchema<EnvironmentApplicationValidationSchema>;
  public readonly server: Joi.ObjectSchema<EnvironmentServerValidationSchema>;
  public readonly logger: Joi.ObjectSchema<EnvironmentLoggerValidationSchema>;

  public constructor(init: Required<EnvironmentValidationSchema>) {
    Object.assign(this, init);
  }
}

export class Environment {
  public readonly profile: string;
  public readonly application: EnvironmentApplication;
  public readonly server: EnvironmentServer;
  public readonly logger: EnvironmentLogger;

  public constructor(init: Required<Environment>) {
    Object.assign(this, init);
  }
}
