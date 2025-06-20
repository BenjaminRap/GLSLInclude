import { Path, NodeVisitors, visit } from "@shaderfrog/glsl-parser/ast/visit.js";
import { getAst } from "./getAst.mjs"
import { Program, AstNode } from '@shaderfrog/glsl-parser/ast/ast-types.js'

let	asts : Program[] = [];
//
// const visitors : NodeVisitors = {
// 	function_call: {
// 		enter: (path : Path<AstNode>) => {
// 			console.log("fonction call 1");
// 		},
// 		exit: (path : Path<AstNode>) => {
//
// 		},
// 	}
// }


// searchFunctionInAst("plot");
// console.log(JSON.stringify(ast, null, 2));
// visit(ast, visitors);

function	parseInclude(line : string) : { functions : string[], file: string }
{
	const	regex : RegExp = /#include \{ ([a-zA-Z0-9_ ,]+) \} from "([a-zA-Z0-9_./]+)";/;
	const	matches : string[] | null= line.match(regex);

	if (matches === null)
		throw new Error("Invalid include");
	return ({
		functions: matches[1].split(", "),
		file: matches[2]
	});
}

async function	processFile(directory: string, file: string) : Promise<void>
{
	const	ast : Program | null = await getAst(directory + file);

	if (ast === null)
		return ;

	asts.push(ast);
	ast.program.forEach((node : AstNode) => {
		if (node.type !== "preprocessor"
			|| !node.line.startsWith("#include"))
		{
			return ;
		}
		console.log(parseInclude(node.line));
	});
}

processFile("./shaders/", "basic.frag");
