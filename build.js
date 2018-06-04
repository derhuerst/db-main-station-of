'use strict'

const {join} = require('path')
const readStations = require('db-stations').full
const {writeFile} = require('fs')

const dest = join(__dirname, 'index.json')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const byId = Object.create(null)

readStations()
.on('data', (station) => {
	byId[station.id] = station.id
	if (Array.isArray(station.additionalIds)) {
		for (let id of station.additionalIds) byId[id] = station.id
	}
})
.once('end', () => {
	writeFile(dest, JSON.stringify(byId), (err) => {
		if (err) showError(err)
	})
})
.once('error', showError)
