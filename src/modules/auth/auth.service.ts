import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { hash } from 'bcrypt';

// não é tao escalavel?
const refreshTokens: { value: string }[] = [];

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    // removivel?
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const generatedTokens = await this.generateTokens(user);
    refreshTokens.push({ value: generatedTokens.refreshToken });
    return generatedTokens;
  }

  private async generateTokens(user: User) {
    const payload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(payload);
    console.log(accessToken);
    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      { expiresIn: '7d' },
    );

    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async refresh(refreshToken: string) {
    try {
      const storedToken = refreshTokens.find((t) => t.value === refreshToken);
      if (!storedToken) {
        throw new UnauthorizedException('Refresh token not recognized');
      }

      const payload = await this.jwtService.verifyAsync(refreshToken);

      if (payload.type !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }
      const user = await this.usersService.findOne(payload.sub);

      // faz sentido?
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const generatedTokens = await this.generateTokens(user);
      // possivel exceção de nenhum token atribuido, evitando exposição do usuario
      storedToken.value = generatedTokens.refreshToken;
      return generatedTokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
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
