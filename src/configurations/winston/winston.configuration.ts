import { environment } from "@environment";

import stringFormat from "string-format";
import DailyRotateFile from "winston-daily-rotate-file";

import { LoggerOptions, Logform, format, transports } from "winston";

const configuration: LoggerOptions = {
  level: environment.logger.level,
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4
  },
  exitOnError: false,
  format: format.combine(
    format.json(),
    format.timestamp({ format: "YYYY/MM/DD HH:mm:ss A" }),
    format.ms(),
    format.colorize({
      all: true,
      colors: {
        error: "red",
        warn: "yellow",
        info: "green",
        verbose: "gray",
        debug: "blue"
      }
    }),
    format.label({
      label: stringFormat("{0} (v{1})", environment.application.name, environment.application.version),
      message: false
    }),
    format.printf(({ context, label, level, message, ms, timestamp }: Logform.TransformableInfo): string => {
      return stringFormat(
        "[{0}] - {1}   {2} [{3}] {4} {5}",
        label,
        timestamp,
        level.padEnd(17, " "),
        context,
        message,
        ms
      );
    })
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: stringFormat(
        "{0}-%DATE%-info.log",
        `${environment.application.name}-v${environment.application.version}`
      ),
      dirname: "logs",
      level: environment.logger.level,
      handleExceptions: false,
      handleRejections: false,
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
      format: format.combine(
        format.errors({ stack: false }),
        format.uncolorize({
          level: true,
          message: true,
          raw: true
        })
      )
    }),
    new DailyRotateFile({
      filename: stringFormat(
        "{0}-%DATE%-error.log",
        `${environment.application.name}-v${environment.application.version}`
      ),
      dirname: "logs",
      level: "error",
      handleExceptions: true,
      handleRejections: true,
      datePattern: "YYYY-MM-DD",
      maxFiles: "30d",
      zippedArchive: true,
      format: format.combine(
        format.errors({ stack: true }),
        format.uncolorize({
          level: true,
          message: true,
          raw: true
        }),
        format.printf(({ context, label, level, message, ms, stack, timestamp }: Logform.TransformableInfo): string => {
          return stringFormat(
            "[{0}] - {1}   {2} [{3}] {4} {5} {6}",
            label,
            timestamp,
            level,
            context,
            message,
            ms,
            Array.isArray(stack) && stack.length > 0 && stack.at(0) !== undefined ? `\n${stack.at(0)}` : ""
          );
        })
      )
    })
  ]
};

export default configuration;
