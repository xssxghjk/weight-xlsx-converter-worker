// @ts-ignore
import * as XLSX from 'xlsx';

const stringToBlob = (str: string) => {
	return new Blob([str], { type: 'text/plain' });
};

async function readXlsFile(file: ArrayBuffer): Promise<any[]> {
	const workbook = XLSX.read(file, { type: 'array' });
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];
	return XLSX.utils.sheet_to_json(worksheet);
}

export default {
	async fetch(request): Promise<Response> {
		const API_URL = 'https://drive.google.com/uc?export=download&id=1emg8Gvnuznw06z-RN6-QxVUL2cnrOgM4';
		request = new Request(API_URL, { method: 'get' });
		console.log(request);
		let response = await (await fetch(request)).arrayBuffer();

		const data = await readXlsFile(response);
		return new Response(JSON.stringify(data), {
			headers: {
				'content-type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type',
			},
		});
	},
} satisfies ExportedHandler;
