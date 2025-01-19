import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from './entities/user.entity';
import { UserService } from "./user.service";

@Controller("users")
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({description: 'The record has been successfully created.'})
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.userService.authenticate(loginDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get All users successfully'})
  @ApiForbiddenResponse({ description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found users'})
  @ApiBody({type: [User]})
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get user by id successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found user'})
  @ApiBearerAuth()
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Update user successfully'})
  @ApiForbiddenResponse({description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found user'})
  @ApiBearerAuth()
  @ApiBody({type: UpdateUserDto})
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete user successfully'})
  @ApiForbiddenResponse({  description: 'Forbidden.'})
  @ApiNotFoundResponse({description:'Not found user'})
  @ApiBearerAuth()
  async remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
