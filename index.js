const express = require('express');
const app = express();
const {getCurrentISSPassengers}  = require('./getPassengers.js')
const cors = require('cors')

const PORT = 6969;
app.use(cors())
app.get('/issPassengers', async (req, res) => {
  let passengers = await getCurrentISSPassengers();
  res.send(passengers)
})

app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`)
})