class Stock {

    static getStockCount() {
        return `
            SELECT COUNT(*) as count
            FROM stock
        `
    }

    static getStockInfo(stock) {
        return `
            SELECT *
            FROM stock
            WHERE symbol = "${stock}"
        `
    }

    static getStockSearch(stock, limit) {
        return `
            SELECT *
            FROM stock
            ORDER BY
            (CASE WHEN symbol = "${stock}" THEN 1 END) DESC,
            (CASE WHEN name LIKE "%${stock}%" THEN 1 END) DESC
            LIMIT ${limit}
        `
    }

    static getFavorites(stocks) {
        return `
            SELECT *
            FROM stock
            WHERE symbol IN (${stocks.map(item => { return `"${item}"` })})
        `
    }

}

module.exports = Stock;