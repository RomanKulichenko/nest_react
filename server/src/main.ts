import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { WrapResponseInterceptor } from './interceptors/wrap-response.interceptor';
import { CustomExceptionFilter } from './exceptionFilters/custom-exception-filter';

async function bootstrap() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.enableCors();
	app.use(helmet());

	// app.useGlobalPipes(new ValidateInputPipe());

	// handle error messages
	app.useGlobalFilters(new CustomExceptionFilter());

	// wrap all data
	app.useGlobalInterceptors( new WrapResponseInterceptor());

	await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}
bootstrap();
