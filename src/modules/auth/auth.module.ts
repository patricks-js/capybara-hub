import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { CustomersModule } from "../customers/customers.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: "unsecure_change_me",
      signOptions: {
        expiresIn: "1d",
      },
    }),
    CustomersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
