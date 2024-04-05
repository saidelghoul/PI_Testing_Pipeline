const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Evenement', // Référence au modèle d'événement
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle d'utilisateur
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
