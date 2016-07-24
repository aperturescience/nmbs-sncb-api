/**
 * @todo  load from Redis database
 */

var _ = require('lodash')
var fs = require('fs')
var leven = require('leven')
var yaml = require('js-yaml')

function all () {
  return loadStations()
}

function get (id) {
  return loadStations()
    .then(stations => _.find(stations, { id: id }))
}

function search (keyword) {
  if (!keyword) throw new Error('No search keyword given')

  return loadStations()
    .then(stations => {
      return _(stations)
        .map(station => {
          station.score = leven(keyword, station.name)
          return station
        })
        .sortBy('score')
        .take(10)
        .value()
    })
}

function loadStations () {
  return new Promise((resolve, reject) => {
    fs.readFile('db/stations.yml', (err, stations) => {
      return err
        ? reject(err)
        : resolve(yaml.safeLoad(stations))
    })
  })
}

module.exports = { all, get, search }
