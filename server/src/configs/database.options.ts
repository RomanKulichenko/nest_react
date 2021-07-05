import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const getDatabaseOptions = (): SequelizeModuleOptions => {
	return {
		dialect: 'postgres',
		host: process.env.POSTRGES_HOST,
		port: Number(process.env.POSTRGES_PORT),
		username: process.env.POSTRGES_USER,
		password: process.env.POSTRGES_PASSWORD,
		database: process.env.POSTRGES_DB,
		models: [],
		autoLoadModels: true 						// Creates database tables based on models
	};
};
