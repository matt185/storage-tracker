<template>
<div id="app">
    <div id="button">
        <ManagerButton v-on:change-view="switchView = !switchView" v-bind:switchView="switchView" />
    </div>
    <div id="title">
        <img id="logo" alt="Vue logo" src="./assets/logo.png">
        <Title msg="Storage Tracker" />
    </div>
    {{myDate}}

    <div>
        <ItemsView v-if="switchView" />
        <ManagerView v-else />
    </div>
</div>
</template>

<script>
import Title from './components/Title.vue'
import ItemsView from './components/ItemsView'
import ManagerView from "./components/ManagerView"
import ManagerButton from "./components/ManagerButton"

export default {
    name: 'App',
    components: {
        Title,
        ItemsView,
        ManagerView,
        ManagerButton
    },
    data: () => {
        return {
            switchView: true,
            myDate: new Date().toISOString().slice(0, 10)
        }
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    flex-direction: column;
}

#button {
    display: flex;
    justify-content: flex-end;

}

#title {
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
    justify-content: center;
}

#logo {
    height: 40px;
}

body {
    background-color: rgb(255, 255, 255);
}
</style>
