const express = require('express')
const mongoose = require('mongoose')

const exchangeRouters = require('./routes/exchange')
const userRouters = require('./routes/user')
const commentRouters = require('./routes/comment')

const requestLoggingMiddleware = require('./middleware/requestLoggingMiddleware')


const app = express()
const port = 8088

// Kết nối mongodb
mongoose.connect('mongodb://localhost:27017/Users', {})
.then(() => {
  console.log('Connected to MongoDB')
})
.catch(err => {
  console.error('Error connecting to MongoDB', err)
})

// Middleware để parse JSON body
app.use(express.json())
app.use(requestLoggingMiddleware)

const url = require('url')
const myURL = new URL('http://localhost:8088/path?name=HoangMai&age=21')

console.log("Host:", myURL.host)
console.log("Pathname:", myURL.pathname)
console.log("Search:", myURL.search)

app.use('/api', exchangeRouters);
app.use('/api', userRouters);
app.use('/api', commentRouters);

app.get('/about', (req, res) => {
  res.send('About page')
})

app.get('/contact', (req, res) => {
  res.send('Contact page')
})

app.get('/abc', (req, res) => {
  res.send('Trang không tồn tại')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
