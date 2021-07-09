// import { INestApplication, Logger } from '@nestjs/common';
// import morgan from 'morgan';

// export function useRequestLogging(app: INestApplication) {
// 	if (process.env.SETTINGS_ENABLE_LOGGING) {
// 		const logger = new Logger('Request');
// 		app.use(
// 			morgan('tiny', {
// 				stream: {
// 					write: (message) => logger.log(message.replace('\n', '')),
// 				},
// 			}),
// 		);
// 	}
// }