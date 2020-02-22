function addListenerMulti(el, s, fn) {
  s.split(" ").forEach(e => el.addEventListener(e, fn, false));
}

export function getBindMedia({ subscribe }) {
  return function bindMedia(el, value, ...args) {
    if (value["bind:media"] || value["bindMedia"]) {
      let state = value["bind:media"] || value["bindMedia"];
      // state is an object in which each value is an observable

      if (state.hasOwnProperty("paused")) {
        subscribe(() => {
          let paused = state.paused();
          if (paused && !el.paused) {
            el.pause();
          } else if (paused === false && el.paused) {
            el.play();
          }
        });
      }

      if (state.hasOwnProperty("volume")) {
        subscribe(() => {
          let num = Number(state.volume());
          num = isNaN(num) ? 1 : Number(num.toFixed(2));
          if (num == el.volume) {
            return;
          } else if (num > 1) {
            num = 1;
          } else if (num <= 0) {
            num = 0;
          }
          el.volume = num;
          state.volume(num);
        });
      }

      if (state.hasOwnProperty("playbackRate")) {
        subscribe(() => {
          el.playbackRate = Number(state.playbackRate()) || 1;
        });
      }

      if (state.hasOwnProperty("currentTime")) {
        subscribe(() => {
          let newTime = Number(state.currentTime()) || 0;
          if (el.currentTime != newTime) {
            el.currentTime = newTime;
          }
        });
      }

      function setProperties() {
        Object.keys(state).forEach(prop => {
          if (state[prop]() != el[prop]) {
            state[prop](el[prop]);
          }
        });
      }
      addListenerMulti(
        el,
        "loadeddata seeking oninput onchange timeupdate volumechange ratechange loadedmetadata ended durationchange",
        setProperties
      );
    }
    delete value["bind:media"];
    delete value["bindMedia"];

    return [el, value, ...args];
  };
}
