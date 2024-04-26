const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userCreator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence vers le modèle d'utilisateur si nécessaire
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'groups', // Référence vers le modèle de groupe
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isAccept:{
     type: Boolean,
  default: true,
}, 
  details: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Référence vers le modèle d'utilisateur si nécessaire
    // Utilisez le type ObjectId pour stocker l'ID de l'utilisateur
    required: true
  },
  isActive: {
    type: Boolean,
    default: true // Par défaut, la notification est active
  },
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
