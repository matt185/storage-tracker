const fs = require("fs");
const db = require("../knex");

(async () => {
    try {
 
        const items = JSON.parse(fs.readFileSync('./util/db/seed/data.json')) 
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
            console.log(productTable)
            
        }
    }catch (err) {
        console.error("Error inserting records", err);
      }
})()