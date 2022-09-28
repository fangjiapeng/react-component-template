const { rollup } = require('rollup');

const commonjs = require('@rollup/plugin-commonjs');// 把node_modules中的commonjs模块转换为es模块
const { nodeResolve } = require('@rollup/plugin-node-resolve'); // 需要打包node_modules中的包
const babel = require('rollup-plugin-babel'); // 处理jsx
const { terser } = require("rollup-plugin-terser");
const json = require('rollup-plugin-json');
const styles = require('rollup-plugin-styles');
const postcss = require('rollup-plugin-postcss');
const extensions = [
    '.js', '.jsx', '.ts', '.tsx',
];

function createInput(entry) {
    return {
        input: entry,
        plugins: [
            nodeResolve({extensions}),
            babel({
                exclude: "node_modules/**",
                runtimeHelpers: true,
            }),
            commonjs(),
            postcss({
                extensions: ['.css', '.less'],
                modules: false,
                use: [
                    ['less', {javascriptEnabled: true}]
                ],
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
    createInput('./src/index.js'),
    createInput('./src/button/index.js'),
    createInput('./src/link/index.js'),
]

// 多出口
const outputOptionsList = [
    [
        {
            dir: 'lib',
            format: 'cjs',
        },
        {
            dir: 'es',
            format: 'es',
        }
    ],
    [
        {
            dir: 'lib/button',
            format: 'cjs',
            exports: 'auto',
        },
        {
            dir: 'es/button',
            format: 'es',
        }
    ],
    [
        {
            dir: 'lib/link',
            format: 'cjs',
            exports: 'auto',
        },
        {
            dir: 'es/link',
            format: 'es',
        }
    ]
    
];

async function build(inputOptions, outputOptions) {
    let bundle;
    let buildFailed = false;
    try {
        bundle = await rollup(inputOptions);
        for(let i = 0; i<outputOptions.length; i++) {
            await bundle.write(outputOptions[i]);
        }
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