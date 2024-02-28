const mongoose = require('mongoose')
const {Schema} = mongoose

const uniteSchema = new Schema({
   name: String, 
     
})

const UniteModel = mongoose.model('Unite',uniteSchema);

module.exports = UniteModel;