import * as Joi from "joi";

import {
  EnvironmentApplicationValidationSchema,
  EnvironmentLoggerValidationSchema,
  EnvironmentServerValidationSchema,
  EnvironmentValidationSchema
} from "./models";

export const environmentValidation: Joi.ObjectSchema<EnvironmentValidationSchema> = Joi.object(
  new EnvironmentValidationSchema({
    profile: Joi.string().valid("local", "development", "staging", "production").required(),
    application: Joi.object(
      new EnvironmentApplicationValidationSchema({
        version: Joi.string().required(),
        name: Joi.string().required()
      })
    ).required(),
    server: Joi.object(
      new EnvironmentServerValidationSchema({
        port: Joi.number().port().required(),
        hostname: Joi.string().hostname().required()
      })
    ).required(),
    logger: Joi.object(
      new EnvironmentLoggerValidationSchema({
        level: Joi.string().valid("info", "debug").required()
      })
    ).required()
  })
).required();
