import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { MongooseError } from "mongoose";

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else if (this.isMongoError(exception)) {
      const mongoException = exception as MongoError;
      status = HttpStatus.BAD_REQUEST;
      message = `Erro no banco de dados: ${mongoException.message}`;
    } else if (this.isValidationError(exception)) {
      const validationException = exception as ValidationError;
      status = HttpStatus.BAD_REQUEST;
      message = `${Object.values(validationException.errors)
        .map((err: Error) => err.message)
        .join(", ")}`;
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private isMongoError(exception: unknown): exception is MongooseError {
    return (
      typeof exception === "object" &&
      exception !== null &&
      "name" in exception &&
      (exception as Error).name === "MongoError"
    );
  }

  private isValidationError(exception: unknown): exception is ValidationError {
    return (
      typeof exception === "object" &&
      exception !== null &&
      "name" in exception &&
      (exception as Error).name === "ValidationError"
    );
  }
}

interface MongoError {
  name: string;
  message: string;
  code?: number;
}

interface ValidationError {
  name: string;
  errors: Record<string, { message: string }>;
}
