import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { USER_IN_UNAUTHORIZED } from '../constants/auth.constants';

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly jwtService: JwtService) {}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		try {
			const authHeader = req.headers.authorization;
			const bearer = authHeader.split(' ')[0];
			const token = authHeader.split(' ')[1];

			if ( bearer !== 'Bearer' || !token) {
				throw new HttpException(USER_IN_UNAUTHORIZED, HttpStatus.UNAUTHORIZED); // 401
			}

			const user = this.jwtService.verify(token);
			req.user = user;

			return true;
		} catch (e) {
			throw new HttpException(USER_IN_UNAUTHORIZED, HttpStatus.UNAUTHORIZED); // 401
		}
	}
}