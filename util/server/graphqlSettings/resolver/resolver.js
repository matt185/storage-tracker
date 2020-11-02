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
            let id=uuidv4()
            let newItem = {
                id: id,
                itemClass: itemClass,
                itemName: itemName,
                amount: amount,
                minAmount: minAmount,
                price: price
            }
            await db('store_items').insert(newItem)
            let check = await db('store_items').where("itemName", itemName)
            if (check.length != 0) {
                await db('store_items').where("id", check[1].id).del()
            }
            return newItem

        },
        deleteItems: async (_, { id }) => {
            await db('store_items').where("id", id).del()
            let check = await db('store_items').where("id", id)
            if (check.length === 0) {
                return true
            }
        },
        updateItem: async (_, { id, itemClass, itemName, amount, minAmount, price }) => {
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
        amountUpdateAdd: async(_, { id, quantity })=>{
            if (!quantity) { quantity = 1 }
            let item = await db('store_items').where("id", id)
            item[0].amount = item[0].amount + quantity 
            await db('store_items').where("id", id).update({ amount: item[0].amount })
            return true
        },
        amountUpdateDecrease: async(_, { id, quantity })=>{
            if (!quantity) { quantity = 1 }
            let item = await db('store_items').where("id", id)
            item[0].amount = item[0].amount - quantity 
            await db('store_items').where("id", id).update({ amount: item[0].amount })
            return true
        }

    }
}

module.exports = resolvers;