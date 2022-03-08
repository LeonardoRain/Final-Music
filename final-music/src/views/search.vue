<template>
  <div class="search">
    <div class="search-input-wrapper">
      <search-input v-model="query"></search-input>
    </div>
    <div class="search-content" v-show="!query">
      <div class="hot-keys">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li
            class="item"
            v-for="item in hotKeys"
            :key="item.id"
            @click="addQuery(item)"
          >
            <span>{{ item.key }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import SearchInput from "@/components/search/search-input";
import Suggest from "@/components/search/suggest";
import { getHotKeys } from "@/service/search.js";

export default {
  name: "search",
  components: { SearchInput, Suggest },
  setup() {
    const query = ref("");
    const hotKeys = ref([]);

    getHotKeys().then((res) => {
      hotKeys.value = res.hotKeys;
    });

    function addQuery(s) {
      query.value = s.key;
    }

    return {
      query,
      hotKeys,
      addQuery,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  position: fixed;
  top: 88px;
  bottom: 0;
  flex-direction: column;
  width: 100%;
  .search-input-wrapper {
    margin: 5px 20px 20px 20px;
  }
  .search-content {
    overflow: hidden;
    flex: 1;
    .hot-keys {
      margin: 0 20px 20px 20px;
      .title {
        margin-bottom: 20px;
        font-size: $font-size-medium;
        color: $color-text-l;
      }
      .item {
        display: inline-block;
        margin: 0 20px 10px 0;
        padding: 5px 10px;
        border-radius: 6px;
        background: $color-highlight-background;
        font-size: $font-size-small;
        color: $color-text-d;
      }
    }
    .search-history {
      position: relative;
      margin: 0 20px;
      .title {
        display: flex;
        align-items: center;
        height: 40px;
        font-size: $font-size-medium;
        color: $color-text-l;
        .text {
          flex: 1;
        }
        .clear {
          @include extend-click();
          .icon-clear {
            font-size: $font-size-medium;
            color: $color-text-d;
          }
        }
      }
    }
  }
  .search-result {
    overflow: hidden;
    flex: 1;
  }
}
</style>
