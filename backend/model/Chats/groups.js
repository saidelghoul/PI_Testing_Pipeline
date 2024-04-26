const mongoose = require('mongoose');

const GroupsSchema = new mongoose.Schema({
    nomgroups:String,
    description:String,
    visibilite:Boolean,
    date:{
        type: Date, 
        default: Date.now 
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
     
     },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
       }],
       profileImage: String,
       coverImage: String,

       notifications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification' 

       }]
  });

  const Groups = mongoose.model('groups', GroupsSchema);

module.exports = Groups;