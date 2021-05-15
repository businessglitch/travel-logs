const express  = require('express');
const helmet = require('helmet');
const morgan = require('morgan')
const cors = require('cors')
const middlewares = require('./middlewares');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000;
const logs = require('./api/logs')


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN
}))

app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
app.use('/api/logs', logs)
app.get('/'), (res, req) => {
    res.json({
        message:'Hello worls'
    });
}
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})