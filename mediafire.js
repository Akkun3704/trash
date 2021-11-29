const axios = require('axios')
const cheerio = require('cheerio')

function download(url) {
	return new Promise((resolve, reject) => {
		if (!/https?:\/\//.test(url)) return reject('Invalid url!')
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('div.dl-btn-label').attr('title')
			let size = $('a#downloadButton').text().split('\n')[1].replace(/ /g, '').replace(/\(|\)/g, '').replace(/download/i, '')
			let link = $('a#downloadButton').attr('href')
			resolve({ title, size, link })
		}).catch(reject)
	})
}

// download(`https://www.mediafire.com/file/hjkxvbv5v0ifm58/HappyMod_terbaru_2021.zip/file`).then(console.log)
