<template>
	<MHeader></MHeader>
	<Tab></Tab>
	<router-view></router-view>
</template>

<script setup>
import MHeader from "@/components/header/header.vue";
import Tab from "@/components/tab/tab.vue";
</script>

<style lang="scss">
.v-enter-active {
	transition: opacity 0.7s ease;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
