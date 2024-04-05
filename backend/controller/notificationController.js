var Page = require("../model/Chats/groups");
const User = require('../model/user');
const Notification =require('../model/Chats/notification');

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
      .populate('userId', 'name') // Récupérer le nom d'utilisateur
      .populate('groupId', 'nomgroups')
      .populate('details', 'name') ;// Récupérer le nom du groupe

    // Envoyer les notifications en réponse
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
}


  module.exports = { afficherNotifications };
  