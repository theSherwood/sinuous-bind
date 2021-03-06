import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/bind.js",
    output: [
      {
        file: "dist/bind.min.js",
        name: "bind",
        format: "iife",
        compact: true,
        plugins: [terser()]
      }
    ]
  },
  {
    input: "./src/bindArea.js",
    output: [
      {
        file: "dist/bindArea.min.js",
        name: "bindArea",
        format: "iife",
        compact: true,
        plugins: [terser()]
      }
    ]
  },
  {
    input: "./src/bindGroup.js",
    output: [
      {
        file: "dist/bindGroup.min.js",
        name: "bindGroup",
        format: "iife",
        compact: true,
        plugins: [terser()]
      }
    ]
  },
  {
    input: "./src/bindMedia.js",
    output: [
      {
        file: "dist/bindMedia.min.js",
        name: "bindMedia",
        format: "iife",
        compact: true,
        plugins: [terser()]
      }
    ]
  },
  {
    input: "./src/all.js",
    output: [
      {
        file: "dist/all.min.js",
        name: "bindAll",
        format: "iife",
        compact: true,
        plugins: [terser()]
      }
    ]
  }
];
