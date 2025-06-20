import { Path, NodeVisitors, visit } from "@shaderfrog/glsl-parser/ast/visit.js";
import { getAst } from "./getAst.mjs"
import { Program, AstNode } from '@shaderfrog/glsl-parser/ast/ast-types.js'

let	asts : Map<string, Program> = new Map<string, Program>();
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


type	Include = {
	functions : string[],
	file: string
};

function	parseInclude(line : string) :  Include | null
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
	const	fullPath : string = directory + file;

	if (asts.has(fullPath))
		return ;
	const	ast : Program | null = await getAst(fullPath);

	if (ast === null)
		return ;

	asts.set(fullPath, ast);
	ast.program.forEach(async (node : AstNode) => {
		if (node.type !== "preprocessor"
			|| !node.line.startsWith("#include"))
		{
			return ;
		}

		const	include : Include | null = parseInclude(node.line);

		if (include === null)
			return ;

		await processFile(directory, include.file);
	});
}

processFile("./shaders/", "basic.frag");
