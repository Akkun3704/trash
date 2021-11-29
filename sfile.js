const axios = require('axios')
const cheerio = require('cheerio')

const baseURL = 'https://sfile.mobi/'

function getLatest() {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}uploads.php`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.list').each(function(i, e) {
				let title = $(e).find('a').text()
				let size = $(e).find('small').text().split(',')[0]
				let upload = $(e).find('small').text().split(' ')[3]
				let link = $(e).find('a').attr('href')
				if (link !== undefined) result.push({ title, size, upload, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function getPopular() {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}top.php`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.list').each(function(i, e) {
				let title = $(e).find('a').text()
				let size = $(e).find('small').text().split(',')[0]
				let download = $(e).find('small').text().split(' ')[3]
				let upload = $(e).find('small').text().split(': ')[2]
				let link = $(e).find('a').attr('href')
				if (link !== undefined) result.push({ title, size, download, upload, link })
			})
			resolve(result)
		}).catch(reject)
	})
}

function search(query, page = 1) {
	return new Promise((resolve, reject) => {
		axios.get(`${baseURL}search.php?q=${query}&page=${page}`).then(({ data }) => {
			let $ = cheerio.load(data)
			let result = []
			$('div.list').each(function(i, e) {
				let title = $(e).find('a').text()
				let size = $(e).text().trim().split('(')[1]
				let link = $(e).find('a').attr('href')
				if (link !== undefined) result.push({ title, size: size.replace(')', ''), link })
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
			let title = $('div.w3-row-padding').find('b').text().trim()
			let size = $('#download').text().replace(/download file/i, '').replace(/\(|\)/g, '').trim()
			let link = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
			resolve({ title, size, link })
		}).catch(reject)
	})
}

// getLatest().then(console.log)
// getPopular().then(console.log)
// search(`Minecraft mod`, 1).then(console.log)
// download(`https://sfile.mobi/bwYXKeoLO87`).then(console.log)
