const express = require('express')
const bodyParser = require('body-parser')
const api = require('./routes/api')
const cors = require('cors')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())

app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.use(bodyParser.json());

app.use('/api', api)

app.get('/', (req, res) => {
    res.send('Hello from server')
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})