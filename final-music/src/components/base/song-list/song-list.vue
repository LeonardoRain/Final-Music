<template>
  <div class="song-list">
    <li
      class="item"
      v-for="(song, index) in songs"
      :key="song.id"
      @click="selectItem(song, index)"
    >
      <div class="content">
        <h2 class="name">{{ song.name }}</h2>
        <p class="desc">{{ getDesc(song) }}</p>
      </div>
    </li>
  </div>
</template>

<script>
export default {
  name: "song-list",
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  emits: ["select"],
  methods: {
    getDesc(song) {
      return `${song.singer}·${song.album}`;
    },
    selectItem(song, index) {
      this.$emit("select", { song, index });
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list {
  .item {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: $font-size-medium;
    .content {
      overflow: hidden;
      flex: 1;
      line-height: 20px;
      .name {
        color: $color-text;

        @include no-wrap();
      }
      .desc {
        margin-top: 4px;
        color: $color-text-d;

        @include no-wrap();
      }
    }
  }
}
</style>
