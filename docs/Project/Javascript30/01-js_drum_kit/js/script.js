function play(event) {
  // console.log(event);
  // console.log(event.keyCode);
  const keyCode = event.keyCode;
  // 播放音乐
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }

  // 修改dom样式
  const dom = document.querySelector(`div[data-key="${keyCode}"]`);
  if (dom) {
    dom.classList.add("playing");
  }

  // console.log(audio, dom);
}

window.addEventListener("keydown", play);

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  // console.log(key);
  key.addEventListener("transitionend", function () {
    key.classList.remove("playing");
  });
});
