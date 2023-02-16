const {Sequelize} = require('sequelize')
const {sequelize} = require('./sequelize')
const {applyExtraSetup} = require('./extra-setup')



const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.reports = require('./report')
db.habad = require('./habad')
db.supermarket = require('./supermarket')
db.synagogue = require('./synagogue')
db.restaurant=require('./restaurant')
db.place = require('./place')
db.hosts = require('./host')
db.users = require('./user')
db.habadEvent = require('./habad_events')

applyExtraSetup();

db.sequelize.sync({alter:true})
.then(()=>{
    console.log('yes re-sync done!')
})
module.exports = db