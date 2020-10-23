
exports.up = function(knex) {
    return knex.schema.createTable("store_items", (table) => {
        table.text("id").unique();
        table.text("itemClass");
        table.text("itemName");
        table.integer("amount");
        table.integer("minAmount");
        table.text("price");
    })
    
};

exports.down = function(knex) {
  
};
