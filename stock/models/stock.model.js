class Stock {

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
            WHERE symbol = "${stock}"
            OR name LIKE "%${stock}%"
            LIMIT ${limit}
        `
    }

}

module.exports = Stock;