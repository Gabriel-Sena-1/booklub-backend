import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ClubsService } from '../clubs/clubs.service';
import { Club } from '../clubs/entities/club.entity';
import { ENV } from 'src/environment/variables/env';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Club]),
    JwtModule.register({
      global: true,
      secret: ENV.AppVariables.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, ClubsService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
