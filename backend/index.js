const connectToMongo = require("./db")
const express = require('express')
var cors = require('cors')

connectToMongo()
const app = express()

const port = 8000
app.use(cors())
app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hello utsav!')
// })
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/subgreddit', require('./routes/subgred'))
// require('./routes/subgred')
// app.use('/api/subgreddit')
app.listen(port, () => {
  console.log(`My backend listening on port ${port}`)
})








