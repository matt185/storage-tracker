const db = require("../../../db/knex")
const {
    v4: uuidv4
} = require('uuid')
const bcrypt = require("bcrypt");

const resolvers = {

    Query: {
        items: async () => {
            return await db('store_items').select().then(t => t)
        },
        itemByClass: async (_, {
            itemClass
        }) => {
            let result = await db('store_items').where("itemClass", itemClass)
            return result
        },
        itemsTakeByUser: async (_, {
            userId
        }) => {
            return await db("item_Take").where("userId", userId).then(t => t)
        },
        user: async (_, {
            userId
        }) => {
            let result = await db("users_Info").where("userId", userId).then(t => t)
            result[0].items = await db("item_Take").where("userId", userId).then(t => t)
            return result
        },
        users: async () => {
            let users = await db("users_Info").select().then(t => t)
            for (let user of users) {
                let userID = user.userId
                user.items = await db("item_Take").where("userId", userID).then(t => t)
            }
            return users
        },
        itemsTake: async () => {
            return await db("item_Take").select().then(t => t)
        },
    },
    Mutation: {
        addItems: async (_, {
            itemClass,
            itemName,
            amount,
            minAmount,
            price
        }) => {
            let id = uuidv4()
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
        deleteItems: async (_, {
            id
        }) => {
            await db('store_items').where("id", id).del()
            let check = await db('store_items').where("id", id)
            if (check.length === 0) {
                return true
            } else {
                return false
            }
        },
        updateItem: async (_, {
            id,
            itemClass,
            itemName,
            amount,
            minAmount,
            price
        }) => {
            if (itemClass) {
                await db('store_items').where("id", id).update({
                    itemClass: itemClass
                })
            }
            if (itemName) {
                await db('store_items').where("id", id).update({
                    itemName: itemName
                })
            }
            if (amount) {
                await db('store_items').where("id", id).update({
                    amount: amount
                })
            }
            if (minAmount) {
                await db('store_items').where("id", id).update({
                    minAmount: minAmount
                })
            }
            if (price) {
                await db('store_items').where("id", id).update({
                    price: price
                })
            }

            let check = await db('store_items').where("id", id)
            return check
        },
        amountUpdateAdd: async (_, {
            id,
            quantity
        }) => {
            if (!quantity) {
                quantity = 1
            }
            let item = await db('store_items').where("id", id)
            item[0].amount = item[0].amount + quantity
            await db('store_items').where("id", id).update({
                amount: item[0].amount
            })
            return true
        },
        amountUpdateDecrease: async (_, {
            id,
            quantity
        }) => {
            if (!quantity) {
                quantity = 1
            }
            let item = await db('store_items').where("id", id)
            item[0].amount = item[0].amount - quantity
            await db('store_items').where("id", id).update({
                amount: item[0].amount
            })
            return true
        },
        addItemUser: async (_, {
            userId,
            id,
            amount
        }) => {
            let item = await db("store_items").where("id", id)
            console.log(item)
            let newItem = {
                userId: userId,
                id: item[0].id,
                itemClass: item[0].itemClass,
                itemName: item[0].itemName,
                amount: amount,
                minAmount: 0,
                price: item[0].price
            }
            let newAmount = await db('store_items').where("id", id)
            newAmount[0].amount = newAmount[0].amount - amount
            await db('store_items').where("id", id).update({
                amount: newAmount[0].amount
            })
            await db("item_Take").insert(newItem)
            return newItem
        },
        deleteAllUserItem: async (_, {
            userId
        }) => {
            await db("item_Take").where("userId", userId).del()
            let items = await db("item_Take").select().then(t => t)
            console.log(items)
            for (let item of items) {
                if (item.userId === userId) {
                    return false
                }
            }
            return true
        },
        deleteSingleUserItem: async (_, {
            userId,
            id
        }) => {
            let amount = await db('item_Take').where("id", id).then(t => t)
            let store = await db('store_items').where("id", id)
            let newAmount = amount[0].amount + store[0].amount
            console.log("amount", newAmount)
            await db('store_items').where("id", id).update({
                amount: newAmount
            })
            await db("item_Take").where("userId", userId).andWhere("id", id).del()
            let items = await db("item_Take").select().then(t => t)
            for (let item of items) {
                if (item.id === id) {
                    return false
                }
            }
            return true
        },
        signUp: async (_, {
            username,
            email,
            password
        }) => {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = {
                userId: uuidv4(),
                username: username,
                email: email,
                password: hashedPassword,
            }
            await db("users_Info").insert(newUser)
            return newUser
        }

    }
}

module.exports = resolvers;