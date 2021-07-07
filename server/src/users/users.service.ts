import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/create-user.dto';
import { UsersModel } from './users.model';

@Injectable()
export class UsersService {
	constructor(@InjectModel(UsersModel) private readonly userRepository: typeof UsersModel) { }

	async createUser(dto: UserDto) {
		const user = await this.userRepository.create(dto);
		return user;
	}

	async getUserByEmail(email: string) {
		// const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
		const user = await this.userRepository.findOne({where: {email}});
		return user;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll();
		return users;
	}
}

