import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		UsersModule,
		JwtModule.register({
			secret: `${process.env.PRIVATE_KEY_JWT}`,
			signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '24h' },
		})
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
