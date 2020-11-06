exports.up = function (knex) {
    return knex.schema.createTable("store_items", (table) => {
        table.text("id").unique();
        table.text("itemClass");
        table.text("itemName").unique();
        table.integer("amount");
        table.integer("minAmount");
        table.float("price");
    }).createTable("users_Info", table => {
        table.text("userId").unique();
        table.text("username").unique();
        table.text("role")
        table.text("password");
    }).createTable("item_Take", table => {
        table.text("userId")
        table.text("id")
        table.text("itemClass");
        table.text("itemName");
        table.integer("amount");
        table.integer("minAmount");
        table.float("price");
    })
};

exports.down = function (knex) {

};