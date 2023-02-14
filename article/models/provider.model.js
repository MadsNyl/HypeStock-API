class Provider {

    static getDistinctProviderCount() {
        return `
            SELECT COUNT(DISTINCT provider) as provider_count
            FROM article
        `
    }

    static getProviders() {
        return `
            SELECT DISTINCT provider
            FROM article
        `
    }

}

module.exports = Provider;