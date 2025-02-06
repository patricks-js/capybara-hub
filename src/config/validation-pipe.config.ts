import { UnprocessableEntityException, ValidationPipe } from "@nestjs/common";
import { ValidationError } from "class-validator";

export const validationPipeConfig = new ValidationPipe({
  exceptionFactory: (errors: ValidationError[]) => {
    const result = errors.map((err) => ({
      field: err.property,
      message: err.constraints[Object.keys(err.constraints)[0]],
    }));

    return new UnprocessableEntityException(result);
  },
  stopAtFirstError: true,
});
