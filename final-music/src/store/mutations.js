const mutations = {
  // 修改播放状态
  setPlayingState(state, playing) {
    state.playing = playing;
  },
  // 设置顺序播放列表
  setSequenceList(state, list) {
    state.sequenceList = list;
  },
  // 设置播放列表
  setPlaylist(state, list) {
    state.playlist = list;
  },
  // 设置播放模式
  setPlayMode(state, mode) {
    state.playMode = mode;
  },
  // 设置正在播放歌曲索引
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  // 设置是否全屏播放
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  // 设置喜欢歌曲列表
  setFavoriteList(state, list) {
    state.favoriteList = list;
  },
  // 添加歌曲歌词
  addSongLyric(state, { song, lyric }) {
    state.sequenceList.map((item) => {
      if (item.mid === song.mid) {
        item.lyric = lyric;
      }
      return item;
    });
  },
  // 设置搜索历史
  setSearchHistory(state, searches) {
    state.searchHistory = searches;
  },
  // 设置播放历史
  setPlayHistory(state, songs) {
    state.playHistory = songs;
  },
};

export default mutations;
