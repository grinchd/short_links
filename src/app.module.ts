import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from 'nestjs-redis'
import { RandomIdService } from './random_id.service';

const redisConfig = {
  host: process.env.REDIS_HOST || 'acer',
  port: parseInt(process.env.REDIS_PORT) || 6379,
  db: parseInt(process.env.REDIS_DB) || 0,
  password: process.env.REDIS_PASSWORD || '',
  keyPrefix: process.env.REDIS_PRIFIX || '',
};

@Module({
  imports: [RedisModule.register(redisConfig)],
  controllers: [AppController],
  providers: [AppService, RandomIdService],
})
export class AppModule { }
