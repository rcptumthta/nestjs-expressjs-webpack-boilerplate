import { TestBed, UnitTestBed } from "@suites/unit";

import { ExampleController } from "./example.controller";
import { ExampleService } from "./example.service";

describe("ExampleController", (): void => {
  let controller: ExampleController;

  beforeAll(async (): Promise<void> => {
    const { unit }: UnitTestBed<ExampleController> = await TestBed.solitary(ExampleController)
      .mock(ExampleService)
      .final({
        hello: (): string => "Welcome to the NestJS (ExpressJS) Webpack Boilerplate"
      })
      .compile();

    controller = unit;
  });

  it("Should be defined", (): void => {
    expect(controller).toBeDefined();
  });

  describe("Success cases", (): void => {
    it("Should return 'Welcome to the NestJS (ExpressJS) Webpack Boilerplate'", (): void => {
      const expected: string = "Welcome to the NestJS (ExpressJS) Webpack Boilerplate";
      const actual: string = controller.index();

      expect(actual).toBe(expected);
    });
  });
});
