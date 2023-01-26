class Stats {

    // get count of comments
    static getCommentsCount() {
        return `
            SELECT COUNT(*) as comments_count
            FROM comment
        `
    }

    // get count of tweets
    static getTweetsCount() {
        return `
            SELECT COUNT(*) as tweets_count
            FROM tweet
        `
    }

    // get count of twitter users
    static getTwitterUsersCount() {
        return `
            SELECT COUNT(*) as users_count
            FROM twitterUser
        `
    }

    // get count of subreddits
    static getSubredditsCount() {
        return `
            SELECT COUNT(DISTINCT subreddit) as subreddits_count
            FROM comment
        `
    }

}

module.exports = Stats;