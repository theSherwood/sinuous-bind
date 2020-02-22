# sinuous-bind

## About

`sinuous-bind` brings the `bind` element directives of [Svelte](https://svelte.dev/) to [Sinuous](https://github.com/luwes/sinuous).

Don't do

```js
`
<input value=${state} oninput=${e => state(e.target.value)} />
`
```

Do

```js
`
<input bind=${state} />
`
```

| size                                                                                                                                                  | esm                      | cdn                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ----------------------------------------------------------- |
| ![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/all.min.js?v=1&compression=gzip&label=gzip&style=flat-square)       | `sinuous-bind`      | https://unpkg.com/sinuous-bind@latest/dist/all.min.js       |
| ![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bind.min.js?v=1&compression=gzip&label=gzip&style=flat-square)      | `sinuous-bind/bind`      | https://unpkg.com/sinuous-bind@latest/dist/bind.min.js      |
| ![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bindArea.min.js?v=1&compression=gzip&label=gzip&style=flat-square)  | `sinuous-bind/bindArea`  | https://unpkg.com/sinuous-bind@latest/dist/bindArea.min.js  |
| ![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bindGroup.min.js?v=1&compression=gzip&label=gzip&style=flat-square) | `sinuous-bind/bindGroup` | https://unpkg.com/sinuous-bind@latest/dist/bindGroup.min.js |
| ![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bindMedia.min.js?v=1&compression=gzip&label=gzip&style=flat-square) | `sinuous-bind/bindMedia` | https://unpkg.com/sinuous-bind@latest/dist/bindMedia.min.js |

## Installation

There are two ways to consume sinuous-bind:

### ESM

[ESM Example CodeSandbox](https://codesandbox.io/s/sinuous-bind-esm-4e48b)

Run the following inside your project directory to get all the bind packages:

`npm install sinuous-bind`

#### Setup

Import all the packages into the root of your project like so:

```js
import "sinuous-bind";
```

Alternatively, bring in any or all of the packages, depending on what you need:

```js
import "sinuous-bind/bind";
import "sinuous-bind/bindGroup";
import "sinuous-bind/bindArea";
import "sinuous-bind/bindMedia";
```

#### Gotchas

These packages are not tree-shakeable. If you import the submodule, you will be stuck with it in your bundle.

[ESM Example CodeSandbox](https://codesandbox.io/s/sinuous-bind-esm-4e48b)

### CDN

[CDN Example CodeSandbox](https://codesandbox.io/s/sinuous-bind-cdn-jjf5q)

Put this in your html to get all the packages:

```html
<script src="https://unpkg.com/sinuous-bind@latest/dist/all.min.js"></script>
```

Alternatively, you can bring in just what you need (though you must include the top one):

```html
<script src="https://unpkg.com/sinuous-bind@latest/dist/bind.min.js"></script>
<script src="https://unpkg.com/sinuous-bind@latest/dist/bindArea.min.js"></script>
<script src="https://unpkg.com/sinuous-bind@latest/dist/bindGroup.min.js"></script>
<script src="https://unpkg.com/sinuous-bind@latest/dist/bindMedia.min.js"></script>
```

You must also bring in [Sinuous](https://github.com/luwes/sinuous):

```html
<script src="https://unpkg.com/sinuous/dist/all.js"></script>
```

#### Setup

If you have brought in `sinuous-bind/dist/all.min.js`, setup is something like what follows:

```js
window.bindAll.enableBind(window.S);
```

Alternatively, if you brought in only `sinuous-bind/dist/bind.min.js`, setup is as follows:

```js
window.bind.enableBind(window.S);
```

If you have brought in more than one package, setup is something like this:

```js
let w = window;
let { register, enableBind } = w.bind;
register(w.bindArea.getBindArea);
register(w.bindGroup.getBindGroup);
register(w.bindMedia.getBindMedia);
enableBind(w.S);
```

#### Gotchas

Unlike the esm format, the cdn format requires the basic bind package (`sinuous-bind/dist/bind.min.js`) for any of the others to be enabled.

[CDN Example CodeSandbox](https://codesandbox.io/s/sinuous-bind-cdn-jjf5q)

## `sinuous-bind/bind`

`bind` can take two kinds of arguments

1. `bind=${<observable>}`
2. `bind=${[<observable> [, <attribute> [, <event> [, <boolean>]]]]}`
   - `<attribute>` defaults to `"value"`
   - `<event>` defaults to `"oninput"`
   - `<boolean>`
     - Pass in `true` to set the attribute with a Sinuous `subscribe`. This is necessary for things like a `contentEditable` binding to `textContent` or `innerHTML`.

Generally, `bind=${state}` is sufficient.

`bind` will attempt to coerce values to numerical values, but will not attempt to coerce booleans or the empty string.

### `<input>` (implicit)

```js
function component() {
  const state = o("");

  return html`
    <input bind=${state} />
  `;
}
```

### `<input>` (explicit)

```js
function component() {
  const state = o("");

  return html`
    <input bind=${[state, "value", "oninput"]} />
  `;
}
```

### `<input type="range">`

```js
function component() {
  const state = o(5);

  return html`
    <input type="range" bind=${state} min="0" max="10" />
  `;
}
```

### `contentEditable`

```js
function component() {
  const state = o("");

  return html`
    <div contentEditable bind=${[state, "textContent", , true]} />
  `;
}
```

Takes `"textContent"` or `"innerHTML"` as the second element of the array. Requires `true` as the fourth element.

### `<input type="checkbox">`

```js
function component() {
  const state = o("");

  return html`
    <input type="checkbox" bind=${[state, "checked", "onchange"]} />
  `;
}
```

### `<input type="radio">`

```js
function component() {
  const state = o("");

  return html`
    <input type="radio" bind=${[state, "checked", "onchange"]} />
  `;
}
```

### `<select>`

```js
function component() {
  const state = o(1);

  return html`
    <select bind=${state}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
  `;
}
```

**Gotchas:** It won't work with the `multiple` attribute. Also, it won't sync until user action. If you need either of these things, use `sinuous-bind/bindGroup`

### `ref`

```js
function component() {
  const ref = o();

  return html`
    <div ref=${ref}></div>
  `;
}
```

**Gotchas:** The value will not be passed into the `ref` observable until the call to `html` is made. The DOM node has to be created before it can be passed to `ref`.

## `sinuous-bind/bindArea`

Both `bind:area` and `bindArea` work.

All `bind:area` bindings are **read-only**.

`bind:area` accepts an object of observables, with any of the following keys:
`clientWidth`, `clientHeight`, `offsetWidth`, `offsetHeight`, `scrollLeft`, `scrollTop`

All these keys can be updated whenever the element is resized. Additionally, `scrollLeft` and `scrollTop` are updated whenever the element is scrolled.

**Effects:** Set a function on the object passed to `bind:area` with the key `effect`. The `effect` will be called on resize and scroll. Set a function with any other key, and it will be called on resize, only.

**Gotchas:** `bind:area` sets `position: relative` on the bound element. Do not set the style on the element unless you set `position`.

### single property

```js
function component() {
  const clientWidth = o();

  return html`
    <div bind:area=${{ clientWidth }}></div>
  `;
}
```

### multiple properties

```js
function component() {
  const clientWidth = o();
  const clientHeight = o();
  const offsetHeight = o();

  return html`
    <div bind:area=${{ clientWidth, clientHeight, offsetHeight }}></div>
  `;
}
```

### multiple properties with scrolling

```js
function component() {
  const clientWidth = o();
  const clientHeight = o();
  const scrollLeft = o();
  const scrollTop = o();

  return html`
    <div
      bind:area=${{ clientWidth, clientHeight, scrollLeft, scrollTop }}
    ></div>
  `;
}
```

### multiple properties with effects

```js
function component() {
  const clientWidth = o();
  const arbitraryEffect = () => console.log("resizing only");
  const scrollLeft = o();
  const effect = () => console.log("resizing and/or scrolling");

  return html`
    <div
      bind:area=${{ clientWidth, arbitraryEffect, scrollLeft, effect }}
    ></div>
  `;
}
```

## `sinuous-bind/bindGroup`

Both `bind:group` and `bindGroup` work.

Like `bind`, `bind:group` will attempt to coerce values to numerical values, but will not attempt to coerce booleans or the empty string.

### select

```js
function component() {
  const state = o(1);

  return html`
    <select bind:group=${state}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
  `;
}
```

### select multiple

```js
function component() {
  const state = o([1, 2]);

  return html`
    <select bind:group=${state} multiple>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>
  `;
}
```

### radio group

```js
function component() {
  const state = o(1);

  return html`
    <input type="radio" bind:group=${state} value="1" />
    <input type="radio" bind:group=${state} value="2" />
    <input type="radio" bind:group=${state} value="3" />
  `;
}
```

### checkbox group

```js
function component() {
  const state = o([1, 2]);

  return html`
    <input type="checkbox" bind:group=${state} value="1" />
    <input type="checkbox" bind:group=${state} value="2" />
    <input type="checkbox" bind:group=${state} value="3" />
  `;
}
```

## `sinuous-bind/bindMedia`

Both `bind:media` and `bindMedia` work.

**Read-only Properties:**
duration, buffered, seekable, seeking, played, ended

**Read/Write Properties:**
currentTime, playbackRate, paused, volume

**Video-only Properties**
videoWidth, videoHeight

### video

```js
function component() {
  const currentTime = o();
  const playbackRate = o();
  const paused = o();
  const volume = o();
  const duration = o();
  const buffered = o();
  const seekable = o();
  const seeking = o();
  const played = o();
  const ended = o();
  const videoWidth = o();
  const videoHeight = o();

  const state = {
    currentTime,
    playbackRate,
    paused,
    volume,
    duration,
    buffered,
    seekable,
    seeking,
    played,
    ended,
    videoWidth,
    videoHeight
  };

  return html`
    <video controls bind:media=${state}>
      <source src=http://video.com type=video/webm />
    </video>
  `;
}
```

### audio

```js
function component() {
  const currentTime = o();
  const playbackRate = o();
  const paused = o();
  const volume = o();
  const duration = o();
  const buffered = o();
  const seekable = o();
  const seeking = o();
  const played = o();
  const ended = o();

  const state = {
    currentTime,
    playbackRate,
    paused,
    volume,
    duration,
    buffered,
    seekable,
    seeking,
    played,
    ended
  };

  return html`
    <audio controls bind:media=${state}>
      <source src=http://audio.com type=audio/webm />
    </audio>
  `;
}
```

## Acknowledgments and Thanks

[Wesley Luyten](https://github.com/luwes)

- Author of [Sinuous](https://github.com/luwes/sinuous)

[Rich Harris](https://github.com/Rich-Harris) and the rest of the [Svelte](https://svelte.dev/) team

- These packages are a port of much of the bind directive functionality present in the [Svelte](https://svelte.dev/) framework
