const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const artpiecesRouter = require('./routes/api/artpieces');
const usersRouter = require('./routes/api/users');

app.use('/api/artpieces', artpiecesRouter);
app.use('/api/users', usersRouter);

// serve static assets if in production 
if(process.env.NODE_ENV === 'production') {
  // set static server
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// const uri = "mongodb+srv://zymka_01:PrVatFSd123gRyEc@cluster0-9pt3u.gcp.mongodb.net/test?retryWrites=true&w=majority";
const uri = process.env.MONGODB_URI || process.env.ATLAS_URI;
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