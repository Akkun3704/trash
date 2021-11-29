const axios = require('axios')
const cheerio = require('cheerio')

const baseURL = 'https://www.mynimeku.com/'

function getLatestAnime() {
	return new Promise((resolve, reject) => {
		axios.get(baseURL).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox-item > a').each(function(i, e) {
				let title = $(e).attr('title')
				let link = $(e).attr('href')
				let status = $(e).find('div.flexbox-status').text()
				let thumb = $(e).find('div.flexbox-thumb > img').attr('data-src')
				let episode = $(e).find('div.flexbox-episode > span.eps').text().split(' ')[1]
				let type = $(e).find('div.flexbox-type').text()
				result.push({ title, status, episode, type, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function getLatestKomik() {
	return new Promise((resolve, reject) => {
		axios.get(baseURL).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox4-item').each(function(i, e) {
				let title = $(e).find('a').attr('title')
				let link = $(e).find('a').attr('href')
				let thumb = $(e).find('div.flexbox4-thumb > img').attr('data-src')
				let type = $(e).find('div.flexbox4-type').text()
				let status = $(e).find('div.flexbox-status').text()
				let chapter = $(e).find('ul.chapter > li').text().split(' ')[1]
				result.push({ title, status, chapter, type, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function search(query) {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}?s=${query}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.flexbox2-item').each(function(i, e) {
				let title = $(e).find('a').attr('title')
				let link = $(e).find('a').attr('href')
				let studio = $(e).find('span.studio').text() || '-'
				let type = $(e).find('div.type').text()
				let score = $(e).find('div.info > div.score').text().trim()
				let season = $(e).find('div.season > a').text() || '-'
				let synopsis = $(e).find('div.synops').text()
				let thumb = $(e).find('div.flexbox2-thumb > img').attr('src')
				result.push({ title, type, score, season, studio, synopsis, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

// getLatestAnime().then(console.log)
// getLatestKomik().then(console.log)
// search(`Non non biyori`).then(console.log)