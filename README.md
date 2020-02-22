# sinuous-bind

![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bind.min.js?v=1&compression=gzip&label=gzip&style=flat-square)
![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bindArea.min.js?v=1&compression=gzip&label=gzip&style=flat-square)
![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bindGroup.min.js?v=1&compression=gzip&label=gzip&style=flat-square)
![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/bindMedia.min.js?v=1&compression=gzip&label=gzip&style=flat-square)
![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous-bind@latest/dist/all.min.js?v=1&compression=gzip&label=gzip&style=flat-square)

Give your [Sinuous](https://github.com/luwes/sinuous) app Svelte-like bindings!

## Installation

There are two ways to consume sinuous-bind:

### ESM

[ESM Example CodeSandbox](https://codesandbox.io/s/sinuous-bind-esm-4e48b)

Run the following inside your project directory to get all the bind packages:

`npm install sinuous-bind`

#### Setup

Import the packages into the root of your project like so:

`import 'sinuous-bind';`

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

### Setup

If you have brought in `sinuous-bind/dist/all.min.js`, setup is something like what follows:

```js
window.bindAll.enableBind(window.S)
```

Alternatively, if you brought in only `sinuous-bind/dist/bind.min.js`, setup is as follows:

```js
window.bind.enableBind(window.S)
```

If you have brought in more than one package, setup is something like this:

```js
let w = window;
let {register, enableBind} = w.bind
register(w.bindArea.getBindArea)
register(w.bindGroup.getBindGroup)
register(w.bindMedia.getBindMedia)
enableBind(w.S)
```

#### Gotchas

Unlike the esm format, the cdn format requires the basic bind package (`sinuous-bind/dist/bind.min.js`) for any of the others to be enabled.

[CDN Example CodeSandbox](https://codesandbox.io/s/sinuous-bind-cdn-jjf5q)

## Usage

TODO

## Acknowledgments and Thanks

[Wesley Luyten](https://github.com/luwes) 

- Author of [Sinuous](https://github.com/luwes/sinuous)

[Rich Harris](https://github.com/Rich-Harris) and the rest of the [Svelte](https://svelte.dev/) team

- These packages are a port of much of the bind directive functionality present in the [Svelte](https://svelte.dev/) framework

