import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { UsersModel } from 'src/users/users.model';
import { ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './constants/auth.constants';

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService) { }

	async register(dto: UserDto) {
		const candidate = await this.usersService.getUserByEmail(dto.email);
		if (candidate) {
			throw new HttpException(ALREADY_REGISTERED_ERROR, HttpStatus.BAD_REQUEST);
		}

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(dto.password, salt);

		// Save user
		await this.usersService.createUser({ ...dto, password: hashPassword });
		return;
	}

	async login(dto: UserDto) {
		const user = await this.validateUser(dto);
		return this.generateToken(user);
	}

	private async generateToken(user: UsersModel) {
		const payload = {
			email: user.email,
			id: user.id
		};
		return {
			token: this.jwtService.sign(payload)
		};
	}

	private async validateUser(dto: UserDto) {
		const user = await this.usersService.getUserByEmail(dto.email);
		if (!user) {
			throw new HttpException(USER_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);	// 404
		}

		// Compare password and hashed password
		const isCorrectPassword = await bcrypt.compare(dto.password, user.password);
		if (!isCorrectPassword) {
			throw new HttpException(WRONG_PASSWORD_ERROR, HttpStatus.UNAUTHORIZED);  // 401
		}
		
		return user;
	}
}