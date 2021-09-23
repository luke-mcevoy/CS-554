const bluebird = require('bluebird');
const flat = require('flat');
const unflatten = flat.unflatten;
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const main = async () => {};

main();
