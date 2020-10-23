const db = require("../../../db/knex")


const resolvers = {

    Query: {
        items: async () => {
            let result = await db('store_items').select().then(t => t)
            console.log(result)
            return result
        }
    }
}

module.exports = resolvers;