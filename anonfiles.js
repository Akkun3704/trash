const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const request = require('request')

function uploadFromPath(path) {
	return new Promise((resolve, reject) => {
		if (!fs.existsSync(path)) return reject('Invalid path!')
		request('https://api.anonfiles.com/upload', { method: 'POST', formData: { file: fs.createReadStream(path) }}, function(err, body) {
			if (err) return reject(err)
			resolve(JSON.parse(body.body).data.file)
		})
	})
}

function download(url) {
	return new Promise((resolve, reject) => {
		if (!/https?:\/\//.test(url)) return reject('Invalid url!')
		axios.get(url).then(({ data }) => {
			let $ = cheerio.load(data)
			let title = $('title').text().replace('- AnonFiles', '').trim()
			let size = $('#download-url').text().split('\n')[1].replace(/ /g, '').replace(/\(|\)/g, '')
			let link = $('#download-url').attr('href')
			link = encodeURI(link)
			resolve({ title, size, link })
		}).catch(reject)
	})
}

// uploadFromPath(`./somefile.ext`).then(console.log)
// download(`https://anonfiles.com/NfQbf6Y7u5/mediafire_js`).then(console.log)
