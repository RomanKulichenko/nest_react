import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exeption: HttpException, host: ArgumentsHost) {

		// For REST API
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exeption.getStatus();

		const errors: Object[] = [];
		const error = exeption.getResponse();
		errors.push(error);

		response
			.status(status)
			.json({
				sucess: false,
				data: {},
				errors
			});
	}
}