import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { terser } from "rollup-plugin-terser";
import json from 'rollup-plugin-json'
import styles from 'rollup-plugin-styles'
import postcss from 'rollup-plugin-postcss'
const cssUrl = require('postcss-url')
const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
  ];

import pkg from "./package.json"

export default {
    input: "./src/index.js",
    output: [
        {
            file: pkg.main,
            format: "cjs",
        },
        {
            file: pkg.module,
            format: "es",
        },
    ],
    external: ['react', 'react-dom'],
    plugins: [
        resolve({extensions}),
        babel({
            exclude: "node_modules/**",
            runtimeHelpers: true,
        }),
        commonjs(),
        postcss({
            modules: false,
            plugins: [cssUrl({url: 'inline'})]
        }),
        styles(),
        json(),
        terser()
    ],
};