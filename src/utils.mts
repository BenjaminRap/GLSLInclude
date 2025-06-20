import fs from 'node:fs';

export async function	readFile(file: string) : Promise<string | null>
{
	try
	{
		const data : string = fs.readFileSync(file, "utf8");

		return (data);
	}
	catch(error)
	{
		console.log(error);
		return (null);
	}
}
