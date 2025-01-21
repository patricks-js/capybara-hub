import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import bcrypt from "bcryptjs";
import type { Model } from "mongoose";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { LoginDto } from "./dto/login.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

type Payload = {
  sub: string;
  name: string;
  email: string;
};

type AuthResult = {
  accessToken: string;
  user: Payload;
};

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      email: createUserDto.email,
      name: createUserDto.name,
      password_hash: hashedPassword,
      phone: createUserDto.phone,
    });

    return user.save();
  }

  async authenticate({ email, password }: LoginDto): Promise<AuthResult> {
    const payload = await this.validateUser({ email, password });

    if (!payload) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: payload,
    };
  }

  async validateUser({ email, password }: LoginDto): Promise<Payload | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) return null;

    return {
      sub: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;
    user.phone = updateUserDto.phone ?? user.phone;
    await user.save();
  }

  async remove(id: string) {
    await this.userModel.deleteOne({ _id: id });
  }
}
