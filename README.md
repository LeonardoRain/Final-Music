# Final-Music
# 项目简介

## 技术栈设计

### Vue 3.0

- **组件化开发**
- **自定义指令**
- **高阶组件**
- **Options API**
- **Composition API**

### Vuex

- **全局状态管理**
- **与本地存储的配合**

### **Vue Router**

- **路由视图配置**
- **路由过渡交互动画**

### 第三方库

- **`better-scroll` 滚动组件**
- **`good-storage` 本地存储插件**
- **`create-keyframe-animation` 动态创建 Animation 插件**
- **`vue3-lazy` 图片懒加载插件**
- **`lyric-parser` 歌词解析插件**
- **`throttle-debounce` 节流防抖工具插件**

### 接口管理

- **后端代理路由**
- **数据的转换与处理**

### 性能优化

- **`KeepAlive` 组件实现缓存**
- **异步路由实现按需加载**

### Composition API

- **滚动组件：`useScroll`**
- **索引列表组件：`useFixed`、`useShortcut`**
- **搜索相关组件：`usePullupLoad`、`useSearchHistory`**
- **轮播图组件：`useSIider`**
- **播放器相关组件：`useAnimation`、`useCd`、`useFavorite`、`useLyric`、`useMiddleInteractive`、`useMiniSlider`、`useMode`、`usePlayHistory`**

## 组件架构设计

### **10 个线上真实接口模块**

- **推荐列表接口**
- **歌手列表接口**
- **歌手详情接口**
- **歌曲 url 获取接口**
- **歌词接口**
- **歌单专辑接口**
- **排行榜接口**
- **排行榜详情接口**
- **热门搜索接口**
- **搜索查询接口**

### 8 个视图组件

- **`Album`：专辑详情页组件**
- **`Recommend`：推荐页面组件**
- **`Search`：搜索页面组件**
- **`Singer`：歌手页面组件**
- **`SingerDetail`：歌手详情页组件**
- **`TopList`：排行榜组件**
- **`TopDetail`：排行榜详情页面组件**
- **`UserCenter`：用户中心页面组件**

### 9 个基础组件

- **`Confirm`：对话框确认组件**
- **`Loading`：加载状态组件**
- **`Message`：消息组件**
- **`NoResult`：无结果组件**
- **`Scroll`：基础滚动组件**
- **`SearchList`：搜索列表组件**
- **`Slider`：轮播图组件**
- **`SongList`：歌曲列表组件**
- **`Switches`：导航栏切换组件**

### 13 个业务组件

- `**AddSong`：添加歌曲组件**
- **`Header`：头部组件**
- **`IndexList`：索引列表组件**
- **`MusicList`：歌曲业务组件**
- **`MiniPlayer`：迷你播放器组件**
- **`Player`：播放器组件**
- **`PlayList`：播放列表组件**
- **`ProgressBar`：条形进度组件**
- **`ProgressCircle`：圆形进度组件**
- **`SearchInput`：搜索框组件**
- **`Suggest`：搜索推荐组件**
- **`Tab`：导航栏组件**
- **`WrapScoll`：业务滚动组件**

### 6 个 JS 模块
