import { environment } from "@environment";

import { Injectable, Logger } from "@nestjs/common";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from "@nestjs/swagger";

@Injectable()
export class ApiDocsService {
  private readonly _logger: Logger = new Logger();

  private readonly _basePath: string = "api-docs";
  private readonly _uiPath: string = `${this._basePath}/ui`;
  private readonly _jsonPath: string = `${this._basePath}/json`;
  private readonly _yamlPath: string = `${this._basePath}/yaml`;

  public run(application: NestExpressApplication): void {
    const configuration: Omit<OpenAPIObject, "paths"> = new DocumentBuilder()
      .setVersion(environment.application.version)
      .setTitle(environment.application.name)
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(application, configuration, {
      autoTagControllers: true,
      deepScanRoutes: true,
      ignoreGlobalPrefix: false
    });

    SwaggerModule.setup(this._uiPath, application, document, {
      useGlobalPrefix: false,
      jsonDocumentUrl: this._jsonPath,
      yamlDocumentUrl: this._yamlPath,
      swaggerOptions: {
        filter: true
      }
    });

    this._logger.log(`Swagger {/${this._basePath}}:`, "RoutesResolver");
    this._logger.log(`Mapped {/${this._uiPath}, GET} route`, "RouterExplorer");
    this._logger.log(`Mapped {/${this._jsonPath}, GET} route`, "RouterExplorer");
    this._logger.log(`Mapped {/${this._yamlPath}, GET} route`, "RouterExplorer");
  }
}
