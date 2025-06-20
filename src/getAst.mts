import { parse, generate } from '@shaderfrog/glsl-parser/index.js';
import { Program } from '@shaderfrog/glsl-parser/ast/ast-types.js'
import { ParserOptions } from '@shaderfrog/glsl-parser/parser/parser.js'

const	options : ParserOptions = {
	stage: 'fragment',
	quiet: false,
	includeLocation: false,
	failOnWarn: false,
	grammarSource: "shader.frag",
}

const	file : string = `
#include "test";
void main() {

}`;

export function	getAst() : Program
{
	return (parse(file, options));
}
