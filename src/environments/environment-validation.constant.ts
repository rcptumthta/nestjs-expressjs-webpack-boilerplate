import * as Joi from "joi";

import { EnvironmentServerValidationSchema, EnvironmentValidationSchema } from "./models";

export const environmentValidation: Joi.ObjectSchema<EnvironmentValidationSchema> = Joi.object(
  new EnvironmentValidationSchema({
    profile: Joi.string().valid("local", "development", "staging", "production").required(),
    server: Joi.object(
      new EnvironmentServerValidationSchema({
        port: Joi.number().port().required(),
        hostname: Joi.string().hostname().required()
      })
    ).required()
  })
).required();
