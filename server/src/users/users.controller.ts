import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	async create(@Body() dto: UserDto) {
		return this.usersService.createUser(dto);
	}

	@Get()
	async getAllUsers() {
		return this.usersService.getAllUsers();
	}
}
