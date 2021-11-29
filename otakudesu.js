const axios = require('axios')
const cheerio = require('cheerio')

const baseURL = 'https://otakudesu.biz.id'

function getLatest(page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}/ongoing/page/${page}/`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.bg-white').get().map(v => {
				let link = $(v).find('a').attr('href')
				let title = $(v).find('img').attr('alt')
				let thumb = $(v).find('img').attr('src')
				let episode = $(v).find('div.eplist').text().split('- ')[1]
				let score = $(v).find('div.starlist').text().trim()
				result.push({ title, episode, score, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function search(query, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}/search/?q=${query}&page=${page}/`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.bg-white').get().map(v => {
				let link = $(v).find('a').attr('href')
				let title = $(v).find('img').attr('alt')
				let thumb = $(v).find('img').attr('src')
				let episode = $(v).find('div.eplist').text()
				let score = $(v).find('div.starlist').text().trim()
				result.push({ title, episode, score, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

// getLatest(2).then(console.log).catch(console.log)
// search(`Non non biyori`, 1).then(console.log).catch(console.log)
