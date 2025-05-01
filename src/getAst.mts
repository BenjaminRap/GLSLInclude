import { parse, generate } from '@shaderfrog/glsl-parser/index.js';

const program = parse('float a = 1.0;');
console.log(program);

const transpiled = generate(program);
console.log(transpiled);
