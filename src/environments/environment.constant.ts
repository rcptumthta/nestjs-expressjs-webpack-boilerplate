import path from "node:path";

import { DotenvConfigOutput, config } from "@dotenvx/dotenvx";

import { Environment, EnvironmentServer } from "./models";

const configuration: DotenvConfigOutput = config({
  path: path.resolve(__dirname, "environments", ".env." + process.env.NODE_ENV),
  encoding: "utf8",
  verbose: false,
  debug: false
});

export const environment: Environment = new Environment({
  profile: configuration.parsed?.NESTJS_PROFILE,
  server: new EnvironmentServer({
    port: Number.parseInt(configuration.parsed?.SERVER_PORT, 10),
    hostname: configuration.parsed?.SERVER_HOSTNAME
  })
});
