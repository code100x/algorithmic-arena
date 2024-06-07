import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export async function isRequestAllowed(userId: string, timeWindow: number): Promise<boolean> {
    const currentTime = Math.floor(Date.now() / 1000);
    const key = `rate_limit:${userId}`;
    const maxRequests = 2;
    await redis.zremrangebyscore(key, '-inf', currentTime - timeWindow);
    await redis.zadd(key, currentTime, currentTime);
    const requestCount = await redis.zcard(key);
    await redis.expire(key, timeWindow);
    return requestCount <= maxRequests;
}