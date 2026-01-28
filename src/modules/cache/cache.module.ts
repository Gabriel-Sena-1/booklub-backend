import { Module, Global } from '@nestjs/common';
import { ENV } from 'src/environment/variables/env';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: ENV.CacheVariables.host,
          port: ENV.CacheVariables.port,
          password: ENV.CacheVariables.password,
          retryStrategy(times: number) {
            if (times > 3) return null;
            return Math.min(times * 50, 2000);
          },
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})

export class CacheModule {}
