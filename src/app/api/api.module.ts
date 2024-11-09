import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";

import { ExampleModule } from "./modules";

@Module({
  imports: [
    ExampleModule,
    RouterModule.register([
      {
        path: "example",
        module: ExampleModule
      }
    ])
  ]
})
export class ApiModule {}
