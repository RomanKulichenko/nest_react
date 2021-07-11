import { Query } from '@nestjs/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PaginationQuery } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllUsers(@Query() paginationQuery: PaginationQuery) {
		return this.usersService.getAllUsers(paginationQuery);
	}
}
