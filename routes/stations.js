var HttpError = require('http-errors')
var router = require('express').Router()
var stations = require('../controllers/stations')

var nmbs = require('../client')

// GET /stations
// returns all stations
router.get('/', (req, res, next) => {
  stations.all()
    .then(stations => res.send({ stations: stations }))
    .catch(next)
})

router.get('/search', (req, res, next) => {
  var query = req.query.query

  if (!query) return next(new HttpError(400, 'No "query" found, or empty'))

  stations.search(query)
    .then(stations => res.send({ stations: stations }))
    .catch(next)
})

// validate stationID, check if it exists
router.param('station', (req, res, next, stationId) => {
  stations.get(stationId)
    .then(station => {
      return !station
        ? next(new HttpError(404, 'Station not found'))
        : next()
    })
})

// GET /stations/0011223
// return the detail of a particular location
router.get('/:station/', (req, res, next) => {
  var id = req.params.station

  stations.get(id)
    .then(station => res.send(station))
    .catch(next)
})

router.get(['/:station/board', '/:station/board/departures'], (req, res, next) => {
  var id = req.params.station

  nmbs.stationBoard({ station: id })
    .then(board => res.send(board))
    .catch(next)
})

router.get('/:station/board/arrivals', (req, res, next) => {
  var id = req.params.station

  nmbs.stationBoard({ station: id })
    .then(board => res.send(board))
    .catch(next)
})

module.exports = router
