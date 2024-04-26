const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  id: Number,
  nomPage: String,
  dateCreation: { type: Date, default: Date.now },

  Creator: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'User' 
    },
    participants:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 

    }],
    visibilte:Boolean,
   

}

);


const Page = mongoose.model('Page', PageSchema);

module.exports = Page;
