import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { Response } from "express";
import { MongooseError } from "mongoose";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (this.isMongoError(exception)) {
      const mongoException = exception as MongoError;
      statusCode = HttpStatus.BAD_REQUEST;
      message = `Database error: ${mongoException.message}`;
    }

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
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
}

interface MongoError {
  name: string;
  message: string;
  code?: number;
}
