import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis/built/Redis';

@Injectable()
export class AuthService {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redis: Redis,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const generatedTokens = await this.generateTokens(user.id);
    await this.saveRefreshToken(user.id, generatedTokens.refreshToken);

    return generatedTokens;
  }

  async saveRefreshToken(userId: string, token: string): Promise<void> {
    const key = `auth:refresh_token:${userId}`;
    const ttl = 7 * 24 * 60 * 60;

    await this.redis.set(key, token, 'EX', ttl);
  }

  private async generateTokens(userId: string) {
    const payload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      { ...payload, type: 'refresh' },
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    let payload;

    try {
      payload = await this.jwtService.verifyAsync(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token');
    }

    const userId = payload.sub;
    const storedToken = await this.getRefreshToken(userId);
    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Refresh token not recognized');
    }

    const userExists = await this.usersService.findOne(userId);
    if (!userExists) {
      throw new UnauthorizedException('User not found');
    }

    const generatedTokens = await this.generateTokens(userId);
    await this.saveRefreshToken(userId, generatedTokens.refreshToken);

    return generatedTokens;
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const key = `auth:refresh_token:${userId}`;
    return this.redis.get(key);
  }
}
