class Subreddit {
    static getDistinctSubredditCount() {
        return `
            SELECT COUNT(DISTINCT subreddit) as subreddit_count
            FROM comment
        `
    }

    static getSubreddits() {
        return `
            SELECT DISTINCT subreddit
            FROM comment
        `
    }
}

module.exports = Subreddit;