import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { UsersModel } from './users.model';
import { UsersService } from './users.service';

@Module({
	imports: [SequelizeModule.forFeature([UsersModel])],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
