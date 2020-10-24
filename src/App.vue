<template>
<div id="app">
    <div>
        <ManagerButton />
    </div>
    <div id="title">
        <img id="logo" alt="Vue logo" src="./assets/logo.png">
        <Title msg="Storage Tracker" />
    </div>
    <div>
        <ItemsView />
        <ManagerView />
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
</style>
