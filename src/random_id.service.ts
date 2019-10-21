import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import IORedis = require('ioredis');

function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

@Injectable()
export class RandomIdService {
    constructor(private readonly redisService: RedisService) { }

    async create(cache: IORedis.Redis): Promise<string> {
        let iteration = 0;
        while (true) {
            const id = makeId(7);
            if (iteration > 10) {
                throw new Error("something wrong with redis");
            }
            if (await cache.get(id) == null) {
                return id;
            }
            iteration += 1;
        }
    }
}
