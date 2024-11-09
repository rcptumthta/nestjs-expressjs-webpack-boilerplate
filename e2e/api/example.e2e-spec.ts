import { ExampleModule } from "@api";

import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import { Test, TestingModule } from "@nestjs/testing";

import supertest from "supertest";

describe("Example (E2E)", (): void => {
  let application: NestExpressApplication;

  beforeAll(async (): Promise<void> => {
    const fixture: TestingModule = await Test.createTestingModule({
      imports: [ExampleModule]
    }).compile();

    application = fixture.createNestApplication(new ExpressAdapter());

    application.useLogger(false);

    await application.init();
  });

  afterAll(async (): Promise<void> => {
    await application.close();
  });

  describe("Success cases", (): void => {
    it("OK (200) ~ GET {/} > Should return 'Welcome to the NestJS (ExpressJS) Webpack Boilerplate'", (): supertest.Test => {
      return supertest(application.getHttpServer())
        .get("/")
        .expect((response: supertest.Response): void => {
          expect(response.status).toBe(200);
          expect(response.text).toBe("Welcome to the NestJS (ExpressJS) Webpack Boilerplate");
        });
    });
  });
});
