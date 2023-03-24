
import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import screeps from 'rollup-plugin-screeps';

import config from './screeps.json' assert { type: 'json' };

if (process.env.DEST && config[process.env.DEST] !== null) {
    if (config[process.env.DEST] === null) {
        throw new Error("Wrong destination passed or screeps.json is not found!");
    } 
}
export default {
    input: "src/main.ts",
    output: {
        file: "dist/main.js",
        format: "cjs",
        sourcemap: true
    },
    plugins: [
        clear({ targets: ["dist"] }),
        resolve({ rootDir: "src", preferBuiltins: true,browser:true,preferBuiltins:true}),
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json"}),
        process.env.DEST ? screeps({ config: {...config,branch:process.env.DEST.toLowerCase()}, }) : undefined
    ]
}