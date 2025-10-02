const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Outreach');

const locations = new mongoose.Schema({
    id: String,
    locatoin: String
});
const Location = mongoose.model("Location" , locations);
app.get('/api/location/:id', async (req, res) => {
  const loc = await Location.findOne({id: req.params.id});
  res.json(loc);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})