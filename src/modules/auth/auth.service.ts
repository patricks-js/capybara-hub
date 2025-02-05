import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import bcryptjs from "bcryptjs";

import { CustomersService } from "../customers/customers.service";
import { SigninDTO } from "./dto/signin.dto";
import { SignupDTO } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly customersService: CustomersService,
  ) {}

  async signup({ name, email, password, phone }: SignupDTO) {
    const emailTaken = await this.customersService.getByEmail(email);

    if (emailTaken) throw new ConflictException("This email was already taken");

    const passwordHash = await bcryptjs.hash(password, 10);

    await this.customersService.create({
      name,
      email,
      phone,
      password: passwordHash,
    });
  }

  async signin({ email, password }: SigninDTO) {
    const customer = await this.customersService.getByEmail(email);

    if (!customer) throw new UnauthorizedException("Invalid credentials");

    const isPasswordValid = await bcryptjs.compare(password, customer.password);

    if (!isPasswordValid)
      throw new UnauthorizedException("Invalid credentials");

    const accessToken = await this.jwtService.signAsync({
      sub: customer._id.toString(),
      name: customer.name,
      email: customer.email,
    });

    return {
      accessToken,
    };
  }
}
