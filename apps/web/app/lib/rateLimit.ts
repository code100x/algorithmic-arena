import Redis from "ioredis";

function getRedisClient() {
  const redis = new Redis(process.env.REDIS_URL || "");
  return redis;
}

export async function rateLimit(
  userId: string,
  limit: number,
  duration: number
): Promise<boolean> {
  const key = `rate_limit:${userId}`;
  const currentTime = Math.floor(Date.now() / 1000);

  try {
    const redis = getRedisClient();
    // Start a Redis transaction
    const transaction = redis.multi();
    transaction.zremrangebyscore(key, 0, currentTime - duration);
    transaction.zadd(key, currentTime, currentTime);
    transaction.zcard(key);

    const results = await transaction.exec();

    const requestCount = results?.[2]?.[1] as number; // Cast to number explicitly

    if (requestCount > limit) {
      return false; // Rate limit exceeded
    }

    await redis.expire(key, duration + 1);
    return true;
  } catch (error) {
    console.error("Rate limiting error:", error);
    return false; // In case of any error, block the request to be safe
  }
}
