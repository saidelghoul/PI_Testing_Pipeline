const Evenement = require("../model/Evenement");
const moment = require("moment");
const User = require("../model/user");
const Reservation = require("../model/Reservation");

async function add(req, res) {
  const {
    titre,
    contenu,
    datedeb,
    datefin,
    cap,
    prix,
    creator: userId,
  } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Vérifier les conditions de date
    if (new Date(datefin) <= new Date(datedeb)) {
      return res
        .status(400)
        .json({ error: "La date de fin doit être après la date de début" });
    }
    if (new Date(datedeb) <= new Date()) {
      return res
        .status(400)
        .json({ error: "La date de début doit être après la date actuelle" });
    }

    // Créer une nouvelle publication (événement)
    const newEvent = new Evenement({
      Titre: titre,
      Contenu: contenu,
      DateDebut: datedeb,
      DateFin: datefin,
      Capacite: cap,
      Prix: prix,
      creator: userId, // Associer l'ID de l'utilisateur connecté à la publication
    });

    // Enregistrer la nouvelle publication
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
}

async function getall(req, res) {
  Evenement.find({})
    .populate({
      path: "comments",
      select: "contenu creator DateCreation",
      // Sélectionnez les champs de commentaire nécessaires
      populate: {
        path: "creator", // Chemin vers le modèle d'utilisateur associé
        select: "name", // Sélectionnez le champ de nom d'utilisateur
      },
    })
    .exec()
    .then((evenement) => {
      res.status(200).json(evenement);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

// Contrôleur pour créer une réservation
async function createReservation(req, res) {
  try {
    const { eventId } = req.params;
    const { creator } = req.body;

    // Récupérer l'événement depuis la base de données
    const event = await Evenement.findById(eventId);

    // Vérifier si l'événement existe
    if (!event) {
      return res.status(404).json({ error: "Événement non trouvé" });
    }

    // Calculer la nouvelle capacité de l'événement
    const newCapacity = event.Capacite - 1; // Soustrayez 1 pour chaque nouvelle réservation

    // Mettre à jour la capacité de l'événement dans la base de données
    await Evenement.findByIdAndUpdate(eventId, { Capacite: newCapacity });

    // Enregistrer la réservation dans la base de données
    const reservation = new Reservation({
      event: eventId,
      creator: creator,
    });
    await reservation.save();

    // Répondre avec la réussite de la réservation
    res.status(201).json({
      message: "Réservation créée avec succès",
      reservation: reservation,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la réservation:", error);
    res.status(500).json({
      error: "Erreur du serveur lors de la création de la réservation.",
    });
  }
}
async function getbyid(req, res) {
  try {
    const pubId = req.params.id;
    const pub = await Evenement.findById(pubId);
    if (!pub) {
      return res.status(404).json({ message: "Le groupe n'existe pas" });
    }
    res.status(200).json(pub);
  } catch (error) {
    console.error("Erreur lors de la récupération du groupe par ID :", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération du groupe",
    });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const evenement = await Evenement.findByIdAndDelete(id);
    if (!evenement) res.status(404).json({ error: "Couldn't find event" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const evenement = await Evenement.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!evenement) res.status(404).json({ error: "Couldn't find event" });
    else res.status(200).json(evenement);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function remove2(req, res) {
  const id = req.params.id;
  try {
    const evenement = await Evenement.findById(id);
    if (!evenement)
      return res.status(404).json({ error: "Couldn't find event" });

    const dateDebut = evenement.dateDebut;
    const currentDate = Date.now;
    const diffInDays = moment(dateDebut).diff(currentDate, "days");

    if (diffInDays < 4) {
      console.log(`Difference in days: ${diffInDays}`);
      return res.status(400).json({ error: "  Too late to delete" });
    }

    const deletedEvent = await Evenement.findByIdAndDelete(id);
    if (!deletedEvent)
      return res.status(404).json({ error: "Couldn't find event" });

    res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}
async function addComment(req, res) {
  try {
    const { id } = req.params;

    const commentaire = new Commentaire({
      contenu: req.body.contenu,
    });

    const nouveauCommentaire = await commentaire.save();

    const evenement = await Evenement.findById(id);

    evenement.commentaires.push(nouveauCommentaire._id);

    const evenementMiseAJour = await evenement.save();

    res.json(evenementMiseAJour);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de l'ajout du commentaire à la publication",
    });
  }
}

module.exports = {
  getall,
  createReservation,
  getbyid,
  add,
  remove,
  update,
};
