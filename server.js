require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
var bodyParser = require('body-parser')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3600

//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())

//routes
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', require('./routes/root'))

app.use('/api/reports', require('./routes/reportRoutes'))
app.use('/api/places', require('./routes/placeRoutes'))
app.use('/api/hosts', require('./routes/hostRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/habad_events', require('./routes/habadEventRoutes'))
app.use('/api/maps', require('./routes/mapRoutes'))
app.use('/api/upload', require('./routes/uploadRoutes'));



app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' })
    } else {
    res.type('txt').send('404 Not Found')
    }
    })
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
