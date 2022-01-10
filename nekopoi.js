const axios = require('axios')
const cheerio = require('cheerio')

const baseURL = 'https://nekopoi.care'

function getLatest(type, page = 1) {
	return new Promise((resolve, reject) => {
		if (/hentai/i.test(type)) {
			axios.get(`${baseURL}/category/hentai/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let desc = $(e).find('p:nth-child(2)').text().trim() || $(e).find('h2:nth-child(1)').text().trim()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, desc, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/3dhentai/i.test(type)) {
			axios.get(`${baseURL}/category/3d-hentai/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/jav/i.test(type)) {
			axios.get(`${baseURL}/category/jav/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else if (/javcosplay/i.test(type)) {
			axios.get(`${baseURL}/category/jav-cosplay/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.top').each(function(i, e) {
					let title = $(e).find('a').text()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		} else {
			axios.get(`${baseURL}/page/${page}`).then(({ data }) => {
				let $ = cheerio.load(data)
				let result = []
				$('div.eropost').each(function(i, e) {
					let title = $(e).find('h2').text().trim()
					let release_date = $(e).find('span:nth-child(2)').text().trim()
					let thumb = $(e).find('img').attr('src')
					let link = $(e).find('a').attr('href')
					result.push({ title, release_date, thumb, link })
				})
				resolve(result)
			}).catch(reject)
		}
	})
}

function getNewHentaiSchedule() {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}/jadwal-new-hentai/`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.coming_soon').each(function(i, e) {
				let title = $(e).find('h2:nth-child(1)').text().trim()
				let release_date = $(e).find('h2:nth-child(3)').text().trim().split('\n')[1].split(' : ')[1]
				let producer = $(e).find('h2:nth-child(3)').text().trim().split('\n')[0].split(' : ')[1]
				let thumb = $(e).find('img').attr('src')
				let link = $(e).find('a').attr('href')
				result.push({ title, release_date, producer, thumb, link: link == '#' ? 'belum tersedia' : baseURL + link })
			})
			resolve(result)
		}).catch(reject)
	})
}

// getLatest('', 1).then(console.log)
// getLatest('hentai', 1).then(console.log)
// getNewHentaiSchedule().then(console.log)

// cuma bisa skrep getLatest nya awokawok
