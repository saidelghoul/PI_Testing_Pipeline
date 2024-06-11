const mongoose = require('mongoose');
const Reply = require('../../model/Forum/ReplaySujet');
const Sujet = require('../../model/Forum/Sujet');
const User = require('../../model/user');

async function getallBySujet(req, res) {
  try {
      const sujetId = req.params.id;  // Correction pour obtenir l'ID du sujet

      // Vérifier si le sujet existe
      const sujet = await Sujet.findById(sujetId);
      if (!sujet) {
          return res.status(404).json({ message: 'Sujet not found' });
      }

      const replays = await Reply.find({ sujet: sujetId }).populate({
        path: 'Creator',
        select: 'name profileImage' // Sélectionnez le champ 'name' du créateur
      });
      res.status(200).json(replays);
  } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des réponses.' });
  }
}

async function addReplay(req, res) {
  const sujetId = req.params.id;  // Correction pour obtenir l'ID du sujet
  const { content, Creator } = req.body;

    try {
        // Vérifier si le sujet existe
        const sujet = await Sujet.findById(sujetId);
        if (!sujet) {
            return res.status(404).json({ message: 'Sujet not found' });
        }

        // Créer une nouvelle réponse
        const newReply = new Reply({
            content,
            Creator: Creator,
            sujet: sujetId
        });

        await newReply.save();

        // Ajouter l'ID de la réponse au tableau des réponses du sujet
        sujet.replays.push(newReply._id);
        await sujet.save();

        res.status(201).json(newReply);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reply', error });
    }
}


module.exports = { getallBySujet, addReplay };
