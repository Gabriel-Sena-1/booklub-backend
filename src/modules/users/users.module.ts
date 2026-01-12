import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ClubsService } from '../clubs/clubs.service';
import { Club } from '../clubs/entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Club])],
  controllers: [UsersController],
  providers: [UsersService, ClubsService],
})
export class UsersModule {}
