const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/artpieces', require('./routes/api/artpieces'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// serve static assets if in production 
if(process.env.NODE_ENV === 'production') {
  // set static server
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// const uri = process.env.MONGODB_URI || process.env.ATLAS_URI; 
const uri = process.env.MONGODB_URI || config.get('mongoURI')
mongoose.connect(uri, { 
  useNewUrlParser: true, 
  useCreateIndex: true
 });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});