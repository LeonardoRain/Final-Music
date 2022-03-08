<template>
  <div class="search-input">
    <i class="icon-search"></i>
    <input class="input-inner" v-model="query" :placeholder="placeholder" />
    <i v-show="query" class="icon-dismiss" @click="clear"></i>
  </div>
</template>

<script>
import { debounce } from "throttle-debounce";

export default {
  name: "search-input",
  props: {
    modelValue: String,
    placeholder: {
      type: String,
      default: "搜索歌曲、歌手",
    },
  },
  data() {
    return {
      query: this.modelValue,
    };
  },
  created() {
    this.$watch(
      "query",
      debounce(300, (newQuery) => {
        this.$emit("update:modelValue", newQuery.trim());
      })
    );

    this.$watch("modelValue", (newVal) => {
      this.query = newVal;
    });
  },
  methods: {
    clear() {
      this.query = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.search-input {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 6px;
  border-radius: 16px;
  width: 100%;
  height: 32px;
  background: $color-highlight-background;
  .icon-search {
    font-size: 24px;
    color: $color-text-d;
  }
  .input-inner {
    flex: 1;
    margin: 0 5px;
    outline: 0;
    background: $color-highlight-background;
    line-height: 18px;
    font-size: $font-size-medium;
    color: $color-text;
    &::placeholder {
      color: $color-text-d;
    }
  }
  .icon-dismiss {
    font-size: 16px;
    color: $color-text-d;
  }
}
</style>
