<template>
<div id="button">
    <button v-if="switchView" v-on:click="$emit('change-view')">manager</button>
    <button v-else @click="$emit('change-view')">customer</button>
</div>
</template>

<script>
export default {
    name: "ManagerButton",
    props: ["switchView"]
}
</script>

<style scoped>

</style>
