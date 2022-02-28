<template>
  <m-header></m-header>
  <Tab></Tab>
  <router-view></router-view>
  <player></player>
</template>

<script>
import Header from "@/components/header/header";
import Tab from "@/components/tab/tab";
import Player from "@/components/player/player";

export default {
  components: {
    MHeader: Header,
    Tab: Tab,
    Player,
  },
};
</script>

<style lang="scss" scoped></style>
