import commonjs from 'rollup-plugin-commonjs';// 把node_modules中的commonjs模块转换为es模块
import resolve from 'rollup-plugin-node-resolve'; // 需要打包node_modules中的包
import babel from 'rollup-plugin-babel'; // 处理jsx
import { terser } from "rollup-plugin-terser";
import json from 'rollup-plugin-json';
import styles from 'rollup-plugin-styles';
import postcss from 'rollup-plugin-postcss';
const cssUrl = require('postcss-url'); // 内联样式
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
            plugins: [cssUrl({url: 'inline'})]// 把css变成内联样式
        }),
        styles(),
        json(),
        terser()
    ],
};