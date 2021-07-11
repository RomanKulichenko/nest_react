// import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PaginationQuery {
	page?: number;
	limit?: number;
}

export class UserDto {

	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string;

	@IsNotEmpty()
	@MinLength(6)
	@IsString()
	// @Exclude()
	password: string;
}