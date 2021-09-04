import fetch from 'node-fetch'
import Koa from 'koa'
import cors from '@koa/cors'


const apiUrl = 'http://www.cnb.cz/cs/financni_trhy/devizovy_trh/kurzy_devizoveho_trhu/denni_kurz.txt'

let cachedData
let lastFetchDate

async function getOrFetchData() {
	if (lastFetchDate === undefined) {
		lastFetchDate = new Date()
		cachedData = await fetchData()
	}
	return cachedData
}

function fetchData() {
	return fetch(apiUrl).then((res) => res.text()).then(parseData)
}

function parseData(rawData) {
	let lines = rawData
		.trim()
		.split('\n')
		.slice(2)
	return lines.map(parseLine)
}

function parseLine(line) {
	const [countryName, name, ammount, code, value] = line.split('|')
	return {
		countryName,
		name,
		ammount: parseInt(ammount),
		code: code.toLowerCase(),
		value: parseFloat(value.replace(',', '.'))
	}
}



const app = new Koa()
app.use(cors())

app.use(async ctx => {
	ctx.body = await getOrFetchData()
})

app.listen(3001)