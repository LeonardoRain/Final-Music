import { PLAY_MODE } from "@/assets/js/constant";
import { shuffle } from "@/assets/js/util";

export function selectPlay({ commit }, { list, index }) {
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", list);
  commit("setCurrentIndex", index);
}

export function randomPlay({ commit }, list) {
  commit("setPlayMode", PLAY_MODE.random);
  commit("setSequenceList", list);
  commit("setPlayingState", true);
  commit("setFullScreen", true);
  commit("setPlaylist", shuffle(list));
  commit("setCurrentIndex", 0);
}

export function changeMode({ commit, state, getters }, mode) {
  const currentId = getters.currentSong.id;
  if (mode === PLAY_MODE.random) {
    commit("setPlaylist", shuffle(state.sequenceList));
  } else {
    commit("setPlaylist", state.sequenceList);
  }
  // 切换为随机播放之后，需要正在播放歌曲的新的播放列表索引，方式打断当前播放
  const index = state.playlist.findIndex((song) => {
    return song.id === currentId;
  });
  commit("setCurrentIndex", index);
  commit("setPlayMode", mode);
}
