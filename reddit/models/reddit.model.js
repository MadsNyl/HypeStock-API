class Reddit {

    static getComment(id) {
        return `
            SELECT *
            FROM comment
            WHERE id = ${id}
        `
    }

    static getCommentsByStock(stock, limit) {
        return `
            SELECT *
            FROM comment
            WHERE symbol = "${stock}"
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getLatestComments(limit) {
        return `
            SELECT *
            FROM comment
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getMostLikedComments(limit) {
        return `
            SELECT *
            FROM comment
            ORDER BY likes DESC
            LIMIT ${limit}
        `
    }

    static getMostDislikedComments(limit) {
        return `
            SELECT *
            FROM comment
            ORDER BY likes
            LIMIT ${limit}
        `
    }

    static getCommentsByAuthor(author, limit) {
        return `
            SELECT *
            FROM comment
            WHERE author = "${author}"
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getCommentCountByAuthor(author) {
        return `
            SELECT COUNT(*)
            FROM comment
            WHERE author = "${author}"
        `
    }

    static getCommentCount() {
        return `
            SELECT COUNT(*) as comment_count
            FROM comment
        `
    }

}

module.exports = Reddit;