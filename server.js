const express = require('express');
let bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const imgRoutes = require('./routes/image');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({path: __dirname + '/.env'});

const app = express();
const port = process.env.PORT || "5000";
app.use(bodyParser.json({limit: '10MB', extended: true}))
app.use(bodyParser.urlencoded({limit: '10MB', extended: true}))

mongoose.connect(`mongodb+srv://noob:${process.env.MONGODB_API_KEY}@cluster0.qyvlb.mongodb.net/${process.env.MONGODB_DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser: true,  useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Accept, Content-type, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});
app.use('/auth', authRoutes);
app.use('/image', imgRoutes);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
module.exports = app;