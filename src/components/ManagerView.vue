<template>
<div id="managerView">
    <InputView id="allproduct" />
    <table border="1px" id="table">
        <tr>
            <td class="head"></td>
            <td class="head">id</td>
            <td class="head">itemClass</td>
            <td class="head">itemName</td>
            <td class="head">price</td>
            <td class="head">amount</td>
            <td class="head">minAmount</td>
            <td class="head">Set Amount</td>
        </tr>
        <tr v-for="(item, i) in items" :key="i">
            <td class="head">{{i+1}}</td>
            <td>{{item.id}}</td>
            <td>{{item.itemClass}}</td>
            <td>{{item.itemName}}</td>
            <td>{{item.price}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.minAmount}}</td>
            <div>
                <td>
                    <div>
                        <input type="text" name="amountInput" class="amount" />
                    </div>
                    <button v-on:click="(increment(item.id,i))" type="submit">+</button>
                    <button v-on:click="(decrement(item.id,i))" type="submit">-</button>
                </td>
            </div>
            <td>
                <button v-on:click="del(item.id)" type="submit">delete</button>
            </td>
        </tr>
    </table>
</div>
</template>

<script>
import gql from "graphql-tag";
import InputView from "./InputView";
import TASKS_DELETE from "../graphql/deleteItems.graphql";
import UPDATE_ITEM_ADD from "../graphql/amountUpdateAdd.graphql";
import UPDATE_ITEM_DECREASE from "../graphql/amountUpdateDecrease.graphql";
export default {
    name: "ManagerView",
    components: {
        InputView
    },
    methods: {
        del(id) {
            this.$apollo.mutate({
                    mutation: TASKS_DELETE,
                    variables: {
                        id: id
                    }
                }),
                this.$apollo.queries.items.refetch();
        },
        increment(id, i) {
            let inputAmount = Number(
                document.body.getElementsByClassName("amount")[i].value
            );

            this.$apollo.mutate({
                    mutation: UPDATE_ITEM_ADD,
                    variables: {
                        id: id,
                        quantity: inputAmount
                    }
                }),
                this.$apollo.queries.items.refetch({
                    amount: id
                });
        },
        decrement(id, i) {
            let inputAmount = Number(
                document.body.getElementsByClassName("amount")[i].value
            );

            this.$apollo.mutate({
                    mutation: UPDATE_ITEM_DECREASE,
                    variables: {
                        id: id,

                        quantity: inputAmount
                    }
                }),
                this.$apollo.queries.items.refetch({
                    amount: id
                });
        }
    },
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
#managerView {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
}

#allproduct {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
}

.head {
    background-color: lightgray;
    font-weight: bolder;
}
</style>
