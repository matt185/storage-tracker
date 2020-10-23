const db = require("../../../db/knex")
const {v4:uuidv4}= require('uuid')

const resolvers = {

    Query: {
        items: async () => {
            let result = await db('store_items').select().then(t => t)
            return result
        },
        itemByClass: async (_, { itemClass }) => {
            let result= await db('store_items').where("itemClass" , itemClass)
            return result
        }
    },
    Mutation: {
        addItems: async (_, { itemClass, itemName, amount, minAmount, price }) => {
            let newItem = {
                id: uuidv4(),
                itemClass: itemClass,
                itemName: itemName,
                amount: amount,
                minAmount: minAmount,
                price:price
            }
            await db('store_items').insert(newItem)

            return newItem
        },
        deleteItems: async(_,{id})=>{
            await db('store_items').where("id", id).del()
            let check= await db('store_items').where("id", id)
            if (check.length === 0) {
                return true
            }
            return String
        }
    }
}

module.exports = resolvers;