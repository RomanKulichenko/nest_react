import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getDatabaseOptions } from './configs/database.options';

@Module({
	imports: [
		ConfigModule.forRoot({							// Get env config
			envFilePath: '.env'
		}),							
		SequelizeModule.forRoot(getDatabaseOptions()),	// Connect to DB
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
