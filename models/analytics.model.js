class Analytics {

    // returns top ten winners of today
    static getWinners() {
        return `SELECT symbol, timing, price_change, price_change_pct
                FROM analytic
                WHERE timing = (SELECT timing
                                FROM analytic
                                ORDER BY timing DESC
                                LIMIT 1)
                ORDER BY price_change_pct DESC
                LIMIT 10`;
    }

    // returns top ten losers of today
    static getLosers() {
        return `SELECT symbol, timing, price_change, price_change_pct
                FROM analytic
                WHERE timing = (SELECT timing
                                FROM analytic
                                ORDER BY timing DESC
                                LIMIT 1)
                AND price_change_pct IS NOT NULL
                ORDER BY price_change_pct
                LIMIT 10`;
    }

}


module.exports = Analytics;