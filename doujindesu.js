const axios = require('axios')
const cheerio = require('cheerio')

const base_url = 'https://doujindesu.id/'

function getLatest() {
	return new Promise((resolve, reject) => {
		axios.get(base_url).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(i, e) {
				let title = $(e).find('a').attr('alt')
				let chapter = $(e).find('div.plyepisode').find('a').text().trim()
				let type = $(e).find('div.type').text()
				let score = $(e).find('div.score').text().trim()
				let thumb = $(e).find('img').attr('src')
				let link = $(e).find('div.plyepisode').find('a').attr('href')
				result.push({ title, chapter, type, score, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function download(url) {
	return new Promise((resolve, reject) => {
		if (!/https?:\/\//.test(url)) return reject('Invalid url!')
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('div.lm').find('h1').text()
			let link = $('div.chright').find('a').attr('href')
			let image = []
			$('div.reader-area > img').each(function(i, e) {
				image.push($(e).attr('src'))
			})
			resolve({ title, link, image })
		}).catch(reject)
	})
}

function search(query) {
	return new Promise((resolve, reject) => {
		axios.get(`${base_url}?s=${query}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.animposx').each(function(i, e) {
				let title = $(e).find('div.title').text().trim()
				let score = $(e).find('div.score').text().trim()
				let type = $(e).find('div.type').text().replace(/Publishing|Finished/i, '')
				let status = $(e).find('div.type').text().replace(/Manhwa|Manga|Doujinshi/i, '')
				let thumb = $(e).find('img').attr('src')
				let link = $(e).find('a').attr('href')
				result.push({ title, score, type, status, thumb, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

// getLatest().then(console.log)
// download(`https://doujindesu.id/2021/11/26/15-fun-no-zangyou/`).then(console.log)
// search(`Secret class`).then(console.log)
