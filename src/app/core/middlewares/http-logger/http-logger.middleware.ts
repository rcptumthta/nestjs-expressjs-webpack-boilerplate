import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

import stringFormat from "string-format";

import { NextFunction, Request, Response } from "express";

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware<Request, Response> {
  private readonly _logger: Logger = new Logger("HTTP");

  public use(request: Request, response: Response, next: NextFunction): void {
    response.on("finish", (): void => {
      const message: string = stringFormat(
        "{0} > {1} ~ {2} | {3} ~ {4} | {5}",
        `${response.statusMessage} (${response.statusCode})`,
        `${request.method} {${request.originalUrl}}`,
        `Language: ${request.header("accept-language")}`,
        `Duration: ${response.getHeader("x-response-time")}`,
        `IP: ${request.ip}`,
        `User-Agent: ${request.header("user-agent")}`
      );

      if (request.statusCode >= 500) {
        this._logger.error(message);
      } else if (request.statusCode >= 400) {
        this._logger.warn(message);
      } else {
        this._logger.log(message);
      }
    });

    next();
  }
}
