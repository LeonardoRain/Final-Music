import { PLAY_MODE, FAVORITE_KEY } from "@/assets/js/constant";
import { load } from "@/assets/js/array-store";

const state = {
  sequenceList: [], // 顺序播放歌单列表
  playlist: [], // 播放列表
  playing: false, // 是否正在播放
  playMode: PLAY_MODE.sequence, // 循环类型
  currentIndex: 0, // 当前播放索引
  fullScreen: false, // 播放器状态
  favoriteList: load(FAVORITE_KEY), // 喜欢歌曲列表
};

export default state;
