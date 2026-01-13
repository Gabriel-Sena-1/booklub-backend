import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';   
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async signIn(email: string, password: string){
    const user = await this.usersService.findByEmail(email);
    
    if (!user){
      throw new NotFoundException('User not found');
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid){
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.name,};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
    
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
