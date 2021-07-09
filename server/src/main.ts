import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { WrapResponseInterceptor } from './interceptors/wrap-response.interceptor';

async function bootstrap() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');
	app.enableCors();
	app.use(helmet());

	// wrap all data
	app.useGlobalInterceptors( new WrapResponseInterceptor());
	
	await app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
}
bootstrap();
