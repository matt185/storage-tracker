<template>
<div>
    <ApolloMutation :mutation="require('../graphql/addItem.graphql')" :variables="{itemClass, itemName, price, amount, minAmount}" @done="onDone">
        <template v-slot="{mutate}">

            <form v-on:submit.prevent="mutate()">
                <div v-if="onUpdate">
                    <label for="id">Id</label>
                    <input class="inp" type="text" v-model="id">
                </div>
                <div>
                    <label for="itemName">ItemName</label>
                    <input class="inp" type="text" v-model="itemName">
                </div>
                <div>
                    <label for="itemClass">itemClass</label>
                    <input class="inp" type="text" v-model="itemClass">
                </div>
                <div>
                    <label for="amount">Amount</label>
                    <input class="inp" type="number" v-model.number="amount">
                </div>
                <div>
                    <label for="minAmont">MinAmont</label>
                    <input class="inp" type="number" v-model.number="minAmount">
                </div>
                <div>
                    <label for="price">Price</label>
                    <input type="text" v-model="price">
                </div>
                <button v-if="onUpdate">Update</button>
                <button v-else @click=mutate()>Add</button>
            </form>
        </template>
    </ApolloMutation>
</div>
</template>

<script>
import gql from 'graphql-tag'
import ADD_ITEM from "../graphql/addItem.graphql"
export default {
    name: "InputView",
    data: () => {
        return {
            id: "",
            itemName: "",
            itemClass: "",
            amount: "",
            price: "",
            minAmount: "",
            onUpdate: false
        }
    },
    methods: {
        onDone() {
            this.$apollo.queries.items.refetch()
        },
        addItem() {
            let itemName = document.body.getElementsByClassName("inp")[0]
            let itemClass = document.body.getElementsByClassName("inp")[1]
            let amount = Number(document.body.getElementsByClassName("inp")[2])
            let minAmount = Number(document.body.getElementsByClassName("inp")[3])
            let price = document.body.getElementsByClassName("inp")[4]
            this.$apollo.mutate({
                mutation: ADD_ITEM,
                variables: {
                    itemClass: itemClass,
                    itemName: itemName,
                    amount: amount,
                    minAmount: minAmount,
                    price: price,
                }
            })
            this.$apollo.queries.items.refetch()
        }
    },
    apollo: {
        items: gql `
        query{
            items{
                id
                itemClass
                itemName
                amount
                minAmount
                price

            }
        }`
    }

}
</script>

<style scoped>

</style>
