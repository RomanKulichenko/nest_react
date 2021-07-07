import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/register')
	async register(@Body() dto: UserDto) {
		return this.authService.register(dto);
	}

	@Post('/login')
	async login(@Body() dto: UserDto) {
		return this.authService.login(dto);
	}
}
