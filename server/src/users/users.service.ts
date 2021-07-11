import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaginationQuery, UserDto } from './dto/create-user.dto';
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

	async getAllUsers(paginationQuery: PaginationQuery) {
		let page = paginationQuery.page;
		let limit = paginationQuery.limit;

		if (!page && !limit) {
			const users = await this.userRepository.findAll();
			return {
				'users': {'data': users}
			};
		}

		page = Number(page) || 1;
		limit = Number(limit) || 20;
		if (page < 0 || limit < 0) {
			throw new HttpException('Incorrect page or limit parameters', HttpStatus.NOT_FOUND);
		}
		const offset = page * limit - limit;

		const users = await this.userRepository.findAndCountAll({offset, limit});

		const totalItems = users.count;
		const totalPages = Math.floor(totalItems / limit) + 1;
		const itemsPerPage = limit;
		const fromItem = offset;
		let toItem = offset + limit;

		if (toItem > totalItems) {
			toItem = totalItems;
		}

		const meta = {
			currentPage: page,
			totalPages,
			fromItem,
			toItem,
			itemsPerPage,
			totalItems,
		};
		
		return {
			'users': {
				'data': users.rows,
				'meta': meta
			}
		};
	}
}

