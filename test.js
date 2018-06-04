'use strict'

const a = require('assert')

const mainStationOf = require('.')

const ibnr = /[0-9]{7}/

a.strictEqual(typeof mainStationOf, 'object')
a.ok(mainStationOf !== null)
a.ok(!Array.isArray(mainStationOf))

for (let id of Object.keys(mainStationOf)) {
	a.strictEqual(typeof id, 'string', 'key is not a string')
	a.ok(id.length > 0, 'key is empty')
	a.ok(ibnr.test(id), `key "${id}" does not look like an IBNR`)

	const mainId = mainStationOf[id]
	a.strictEqual(typeof mainId, 'string', `map[${id}] is not a string`)
	a.ok(mainId.length > 0, `map[${id}] is empty`)
	a.ok(ibnr.test(mainId), `map[${id}] does not look like an IBNR`)
}

const berlinSpandauS = '8089083'
const berlinSpandau = '8010404'
a.strictEqual(mainStationOf[berlinSpandauS], berlinSpandau)
