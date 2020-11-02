<template>
<div id="itemTable">
    <table border="1px" id="table">
        <tr>
            <td class="head"></td>
            <td class="head">id</td>
            <td class="head">itemClass</td>
            <td class="head">itemName</td>
            <td class="head">amount</td>
            <td class="head">price</td>
        </tr>
        <tr v-for="(item,i) in items" :key="i">
            <td class="head">{{i+1}}</td>
            <td>{{item.id}}</td>
            <td>{{item.itemClass}}</td>
            <td>{{item.itemName}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.price}}</td>
        </tr>
    </table>
</div>
</template>

<script>
import gql from "graphql-tag";
export default {
    name: "ItemsView",
    apollo: {
        items: gql `
      query {
        items {
          id
          itemClass
          itemName
          amount
          minAmount
          price
        }
      }
    `
    }
};
</script>

<style scoped>
#itemTable {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.head {
    background-color: lightgray;
    font-weight: bolder;
}
</style>
