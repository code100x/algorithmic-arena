import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export async function isRequestAllowed(userId: string,timeWindow:number): Promise<boolean> {
    const currentTime = Math.floor(Date.now() / 1000);
    const key = `rate_limit:${userId}`;

    const maxRequests = 2;

    const timestamps = await redis.lrange(key, 0, -1);
    const validTimestamps = timestamps
        .map(Number)
        .filter(timestamp => timestamp > currentTime - timeWindow);

    if (validTimestamps.length < maxRequests) {
        await redis.multi()
            .rpush(key, currentTime)
            .expire(key, timeWindow)
            .exec();
        return true;
    } else {
        return false;
    }
}
