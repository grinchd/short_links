import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { RandomIdService } from './random_id.service';

@Injectable()
export class AppService {
  constructor(
    private readonly redisService: RedisService,
    private readonly randomIdService: RandomIdService
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async minify(link: string): Promise<string> {
    const cache = await this.redisService.getClient();
    const id = await this.randomIdService.create(cache);
    return cache.set(id, link).then(okValue => id);
  }
}
