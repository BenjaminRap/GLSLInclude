import { getAst } from "./getAst.mjs"
import { Program, AstNode } from '@shaderfrog/glsl-parser/ast/ast-types.js'

let	ast : Program = getAst();

function	searchFunctionInAst(name : string) : void
{
	ast.program.forEach((node : AstNode) => {
		if (node.type == 'function')
			console.log("founded !");
	})
}

// searchFunctionInAst("plot");
console.log(JSON.stringify(ast, null, 2));
