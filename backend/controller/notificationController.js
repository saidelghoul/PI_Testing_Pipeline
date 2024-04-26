var Page = require("../model/Chats/groups");
const User = require('../model/user');
const Notification =require('../model/Chats/notification');
const Historique = require("../model/Chats/Historique");

async function afficherNotifications(req, res) {
  try {
    const userId = req.body.userId; // l'ID de l'utilisateur connecté
    const groupId = req.params.groupId; // l'ID du groupe

    // Trouver le groupe par son ID
    const group = await Page.findById(groupId);

    // Vérifier si l'utilisateur est le créateur du groupe
    if (group.creator.toString() == userId) {
      return res.status(403).json({ error: "Accès refusé" });
    }

    // Trouver toutes les notifications pour ce groupe
    const notifications = await Notification.find({ groupId: groupId })
      .populate('userCreator', 'name') // Récupérer le nom d'utilisateur
      .populate('groupId', 'nomgroups')
      .populate('details', 'name') ;// Récupérer le nom du groupe

    // Envoyer les notifications en réponse
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
}

async function Accpeter(req, res) {
  const { notifId } = req.params;
  try {
    const notif = await Notification.findById(notifId);
    if (!notif) return res.status(404).json({ error: "Notification introuvable" });
    await Historique.create({ notification: notifId, action: 'accepter', userCreator: notif.userCreator });

    notif.isActive = false;
    await notif.save();

    res.status(200).json({ message: "Notification acceptée avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
}

async function Refuser(req, res) {
  const { notifId } = req.params;
  try {
    const notif = await Notification.findById(notifId);
    if (!notif) return res.status(404).json({ error: "Notification introuvable" });

    // Créer une entrée dans l'historique avec l'ID du userCreator
    await Historique.create({ notification: notifId, action: 'refuser', userCreator: notif.userCreator });

    // Désactiver la notification au lieu de la supprimer
    notif.isActive = false;
    await notif.save();

    res.status(200).json({ message: "Notification refusée avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
};


const getHistoriquesByCreatorId = async (req, res) => {
  const id = req.params.id;
  try {
    const historiques = await Historique.find({ 'userCreator': id })
      .populate({
        path: 'notification',
        select: 'details groupId', // Combinez les sélections en une seule chaîne
        populate: [
          {
            path: 'details',
            select: 'name'
          },
          {
            path: 'groupId',
            select: 'nomgroups'
          }
        ]
      });
    if (!historiques || historiques.length === 0) {
      return res.status(404).json({ error: "Aucun historique trouvé pour cet ID de créateur" });
    }
    res.status(200).json({ historiques });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
};




  module.exports = { afficherNotifications ,Accpeter,Refuser,getHistoriquesByCreatorId};
  