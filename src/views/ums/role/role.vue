<template>
    <button @click="awesome = !awesome">Toggle</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢 {{ reverseMsg }}</h1>
</template>

<script>
export default {

}
</script>

<style></style>