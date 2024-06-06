const mongoose = require("mongoose");
var Schema = mongoose.Schema;


const technologySchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: {type: String, required: false},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // L'utilisateur qui a créé la technologie
    createdAt: { type: Date, default: Date.now }
  });
  
  module.exports  = mongoose.model('Technology', technologySchema);
