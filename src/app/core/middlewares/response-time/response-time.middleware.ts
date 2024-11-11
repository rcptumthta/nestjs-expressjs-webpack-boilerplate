import { Injectable, NestMiddleware } from "@nestjs/common";

import responseTime from "response-time";

import { NextFunction, Request, Response } from "express";

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware<Request, Response> {
  public use(request: Request, response: Response, next: NextFunction): void {
    responseTime()(request, response, next);
  }
}
