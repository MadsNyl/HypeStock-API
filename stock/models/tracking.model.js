class Tracking {

    static getTrackingsByDays(stock, days) {
        return `
            SELECT *
            FROM tracking
            WHERE symbol = "${stock}"
            AND timing >= DATE(NOW() - INTERVAL ${days} DAY)
            ORDER BY timing DESC
        `  
    }

    static getFirstTracking(stock) {
        return `
            SELECT *
            FROM tracking 
            WHERE symbol = "${stock}"
            ORDER BY timing
            LIMIT 1
        `
    }

}

module.exports = Tracking;