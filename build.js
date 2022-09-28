const { rollup } = require('rollup');

const commonjs = require('rollup-plugin-commonjs');// 把node_modules中的commonjs模块转换为es模块
const resolve = require('rollup-plugin-node-resolve'); // 需要打包node_modules中的包
const babel = require('rollup-plugin-babel'); // 处理jsx
const { terser } = require("rollup-plugin-terser");
const json = require('rollup-plugin-json');
const styles = require('rollup-plugin-styles');
const postcss = require('rollup-plugin-postcss');
// const cssUrl = require('postcss-url'); // 内联样式
const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

function createInput(name, entry) {
    return {
        input: {
            [name]: entry
        },
        plugins: [
            resolve({extensions}),
            babel({
                exclude: "node_modules/**",
                runtimeHelpers: true,
            }),
            commonjs(),
            postcss({
                modules: false,
                extract: 'style/index.css',
            }),
            styles(),
            json(),
            // terser(),
        ],
        external: ['react', 'react-dom'],
    }
}

const inputList = [
    createInput('index', './src/index.js'),
    createInput('button', './src/button/index.js'),
    createInput('link', './src/link/index.js'),
]

// 多出口
const outputOptionsList = [
    {
        dir: 'dist',
        format: 'cjs',
    },
    {
        dir: 'dist/lib/button',
        format: 'cjs',
    },
    {
        dir: 'dist/lib/link',
        format: 'cjs',
    }
];

async function build(inputOptions, outputOptions) {
    let bundle;
    let buildFailed = false;
    try {
        bundle = await rollup(inputOptions);
        await bundle.write(outputOptions);
    } catch(err) {
        buildFailed = true;
        console.error(err);
        process.exit(1);
    }
    if (bundle) {
        // closes the bundle
        await bundle.close();
    }
    
}


async function main() {
    for(let i = 0; i < inputList.length; i++) {
        await build(inputList[i], outputOptionsList[i]);
    }
    process.exit(0);
}

main()