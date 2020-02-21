import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./src/cdn/bind.js",
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
    input: "./src/cdn/bindArea.js",
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
    input: "./src/cdn/bindGroup.js",
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
    input: "./src/cdn/bindMedia.js",
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
    input: "./src/cdn/all.js",
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
