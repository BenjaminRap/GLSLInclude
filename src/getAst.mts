import { parse } from '@shaderfrog/glsl-parser/index.js';
import { Program } from '@shaderfrog/glsl-parser/ast/ast-types.js'
import { ParserOptions } from '@shaderfrog/glsl-parser/parser/parser.js'
import { readFile } from "./utils.mjs";

const	options : ParserOptions = {
	stage: 'fragment',
	quiet: false,
	includeLocation: false,
	failOnWarn: false,
	grammarSource: "shader.frag",
}

export async function	getAst(url : string) : Promise<Program | null>
{
	const	content : string | null = await readFile(url);

	if (content === null)
		return (null);
	return (parse(content, options));
}
