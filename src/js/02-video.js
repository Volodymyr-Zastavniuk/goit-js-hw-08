import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo('vimeo-player');
const STORAGE_KEY = 'videoplayer-current-time';
let currentTime = localStorage.getItem(STORAGE_KEY);

if (currentTime) {
  player.setCurrentTime(currentTime);
}

player.on(
  'timeupdate',
  throttle(function (e) {
    localStorage.setItem(STORAGE_KEY, e.seconds);
  }, 1000)
);
