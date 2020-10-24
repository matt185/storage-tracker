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
                price: price
            }
            await db('store_items').insert(newItem)

            return newItem
        },
        deleteItems: async (_, { id }) => {
            await db('store_items').where("id", id).del()
            let check = await db('store_items').where("id", id)
            if (check.length === 0) {
                return true
            }
            return String
        },
        modifyItem: async (_, { id, itemClass, itemName, amount, minAmount, price }) => {
            if (itemClass){
                await db('store_items').where("id", id).update({ itemClass: itemClass })
            }
            if (itemName){
                await db('store_items').where("id", id).update({ itemName: itemName })
            }
            if (amount){
                await db('store_items').where("id", id).update({ amount: amount })
            }
            if (minAmount) {
                await db('store_items').where("id", id).update({ minAmount: minAmount })
            } if (price){
                await db('store_items').where("id", id).update({ price: price })
            }
            
            let check= await db('store_items').where("id", id)
            return check
        },
        amountModifier: async(_, { id, action, quantity })=>{
            if (!quantity) { quantity = 1 }
            let item = await db('store_items').where("id", id)
            if (action === "+") { item[0].amount = item[0].amount + quantity }
            if (action === "-") { item[0].amount = item[0].amount - quantity }
            
            await db('store_items').where("id", id).update({ amount: item[0].amount })
            return item
        }

    }
}

module.exports = resolvers;