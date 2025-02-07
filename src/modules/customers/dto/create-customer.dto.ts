import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
  @ApiProperty({
    description: "Customer full name",
    example: "John Doe",
  })
  readonly name: string;

  @ApiProperty({
    description: "Customer email address",
    example: "john.doe@example.com",
  })
  readonly email: string;

  @ApiProperty({
    description: "Customer password",
    example: "securePassword123",
  })
  readonly password: string;

  @ApiProperty({
    description: "Customer phone number",
    example: "+55 11 98765-4321",
  })
  readonly phone: string;
}
