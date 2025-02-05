import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { SigninDTO } from "./dto/signin.dto";
import { SignupDTO } from "./dto/signup.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() signupDTO: SignupDTO) {
    return this.authService.signup(signupDTO);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  signin(@Body() signinDTO: SigninDTO) {
    return this.authService.signin(signinDTO);
  }
}
