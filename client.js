var HafasClient = require('hafas-mgate-client')

var client = new HafasClient({
  baseUrl: 'http://www.belgianrail.be/jp/sncb-nmbs-routeplanner/mgate.exe',
  auth: process.env.AUTH,
  name: '🚊choo-choo'
})

module.exports = client
