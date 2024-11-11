import path from "node:path";

import { DotenvConfigOutput, config } from "@dotenvx/dotenvx";

import { Environment, EnvironmentApplication, EnvironmentLogger, EnvironmentServer } from "./models";

const configuration: DotenvConfigOutput = config({
  path: path.resolve(__dirname, "environments", ".env." + process.env.NODE_ENV),
  encoding: "utf8",
  verbose: false,
  debug: false
});

export const environment: Environment = new Environment({
  profile: configuration.parsed?.NESTJS_PROFILE,
  application: new EnvironmentApplication({
    version: configuration.parsed?.APPLICATION_VERSION,
    name: configuration.parsed?.APPLICATION_NAME
  }),
  server: new EnvironmentServer({
    port: Number.parseInt(configuration.parsed?.SERVER_PORT, 10),
    hostname: configuration.parsed?.SERVER_HOSTNAME
  }),
  logger: new EnvironmentLogger({
    level: configuration.parsed?.LOGGER_LEVEL
  })
});
