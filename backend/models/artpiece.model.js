  
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artpieceSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  uri: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Artpiece = mongoose.model('Artpiece', artpieceSchema);

module.exports = Artpiece;