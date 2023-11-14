import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
  } from '@nestjs/common';
import { Response } from 'express';
import { classToPlain } from 'class-transformer';
import { ValidationError } from 'class-validator';


@Catch(BadRequestException)
export class httpFilter implements ExceptionFilter {
    catch(exception: any , host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const responseBody = exception.response;
        const isValidationError = responseBody instanceof ValidationError;
        console.log(exception,isValidationError);
        return response
            .status(status)
            .json(
                {
                    code:status,
                    data:responseBody
                }
            )
    }
}
