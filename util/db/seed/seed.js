const fs = require("fs");
const db = require("../knex");

(async () => {
    try {
        const data = JSON.parse(fs.readFileSync('./util/db/seed/data.json'))

        let items = data[0].items
        let itemsTake = data[0].itemsTake
        let users = data[0].users

        for (const item of items) {
            const id = item.id
            const itemClass = item.ItemClass
            const itemName = item.ItemName
            const amount = item.amount
            const minAmount = item.minAmount
            const price = item.price

            const productTable = await db("store_items").insert({
                id,
                itemClass,
                itemName,
                amount,
                minAmount,
                price
            })
        }
        for (const item of itemsTake) {
            const userId = item.userId
            const id = item.id
            const itemClass = item.ItemClass
            const itemName = item.ItemName
            const amount = item.amount
            const minAmount = item.minAmount
            const price = item.price

            const usersTable = await db("item_Take").insert({
                userId,
                id,
                itemClass,
                itemName,
                amount,
                minAmount,
                price
            })
        }
        for (const user of users) {
            const userId = user.userId
            const username = user.username
            const email = user.email
            const password = user.password

            const usersTable = await db("users_Info").insert({
                userId,
                username,
                email,
                password
            })
        }
    } catch (err) {
        console.error("Error inserting records", err);
    }
})()