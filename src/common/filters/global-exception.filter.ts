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
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, message } = this.getErrorResponse(exception);

    response.status(statusCode).json({
      statusCode,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  private getErrorResponse(exception: unknown): {
    statusCode: number;
    message: string;
  } {
    if (this.isMongoError(exception)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Database error: ${(exception as MongoError).message}`,
      };
    }

    if (exception instanceof TypeError) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Type error: ${exception.message}`,
      };
    }

    if (exception instanceof Error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Error: ${exception.message}`,
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    };
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
