import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Post()
	async create(@Body() dto: UserDto) {
		return this.usersService.createUser(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllUsers() {
		return this.usersService.getAllUsers();
	}
}
