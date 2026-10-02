const cache = new Map();

const TTL = 60 * 1000;


function invalidateCache() {
    cache.clear();
}


function cacheMiddleware(req, res, next) {

    const key = req.originalUrl;

    const cached = cache.get(key);

    if (cached) {

        const age = Date.now() - cached.createdAt;

        if (age < TTL) {

            res.setHeader("X-Cache", "HIT");

            return res.json(cached.data);
        }

        cache.delete(key);
    }

    res.setHeader("X-Cache", "MISS");

    const originalJson = res.json.bind(res);

    res.json = (data) => {

        cache.set(key, {
            data,
            createdAt: Date.now()
        });

        return originalJson(data);
    };

    next();
}


module.exports = {
    cache,
    cacheMiddleware,
    invalidateCache
};