import { PublicRoute } from "@/common/decorators/public-route";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin.dto";
import { SignupDto } from "./dto/signup.dto";

@PublicRoute()
@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  @ApiOperation({ summary: "Signup customer" })
  @ApiCreatedResponse({ description: "Customer created successfully" })
  @ApiConflictResponse({ description: "Customer already exists" })
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post("signin")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Signin customer" })
  @ApiOkResponse({ description: "Customer signed in successfully" })
  @ApiUnauthorizedResponse({ description: "Invalid credentials" })
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }
}
