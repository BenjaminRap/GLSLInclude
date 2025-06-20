import { Path, NodeVisitors, visit } from "@shaderfrog/glsl-parser/ast/visit.js";
import { getAst } from "./getAst.mjs"
import { Program, AstNode } from '@shaderfrog/glsl-parser/ast/ast-types.js'

let	ast : Program = getAst();
//
const visitors : NodeVisitors = {
	function_call: {
		enter: (path : Path<AstNode>) => {
			console.log("fonction call 1");
		},
		exit: (path : Path<AstNode>) => {

		},
	}
}

// searchFunctionInAst("plot");
// console.log(JSON.stringify(ast, null, 2));
visit(ast, visitors);
