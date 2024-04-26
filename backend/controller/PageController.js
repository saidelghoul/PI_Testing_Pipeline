var Page = require("../model/Chats/groups");
const User = require('../model/user');
const Notification =require('../model/Chats/notification');

async function participerAuGroupe(req, res) {
  try {
    const userId = req.body.userId;
    const groupId = req.params.pageId;

    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Trouver le groupe par son ID
    const group = await Page.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: "Groupe non trouvé" });
    }

    // Vérifier si l'utilisateur est déjà participant au groupe
    if (group.participants && group.participants.includes(userId)) {
      return res.status(400).json({ error: "L'utilisateur participe déjà à ce groupe" });
    }

    // Ajouter l'utilisateur à la liste des participants
    if (!group.participants) {
      group.participants = [];
    }
    group.participants.push(userId);

    // Créer une nouvelle notification pour le créateur du groupe
    const notification = new Notification({
      userCreator: group.creator,
      groupId: groupId,
      type: 'demande_participation',
      details: userId,
    });
    await notification.save();

    // Ajouter l'identifiant de la notification à la liste des notifications du groupe
    if (!group.notifications) {
      group.notifications = [];
    }
    group.notifications.push(notification._id);

    // Sauvegarder les modifications apportées au groupe
    await group.save();

    // Envoyer une réponse avec un message de succès
    res.status(200).json({ message: "Participation réussie" });

    // Envoyer la notification au créateur du groupe (à implémenter)
    // envoyerNotificationAuCreateur(notification);
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
}


async function add(req, res) {
  try {
    const profileImage = req.files.profileImage[0];
    const coverImage = req.files.coverImage[0];
    const { nomgroups, description, visibilite } = req.body;
    const userId = req.body.creator; // Supposons que l'ID de l'utilisateur connecté est envoyé dans la requête

    // Créer une nouvelle instance de groupe avec les ID des images de profil et de couverture
    const newGroup = new Page({
      nomgroups,
      description,
      visibilite,
      creator: userId,
      profileImage: profileImage.filename,
      coverImage: coverImage.filename
    });

    // Enregistrer le nouveau groupe dans la base de données
    const savedGroup = await newGroup.save();

    // Répondre avec le groupe nouvellement créé
    res.status(201).json(savedGroup);
  } catch (err) {
    // En cas d'erreur, répondre avec un code d'erreur et un message d'erreur
    console.error(err);
    res.status(500).json({ error: "Erreur du serveur: " + err.message });
  }
}



async function getall(req, res) {
  try {
      const pages = await Page.find({}).exec();
      res.status(200).json(pages);
  } catch (error) {
      res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function getbyid(req, res) {
  try {
    const groupId = req.params.id;
    const group = await Page.findById(groupId);
    if (!group) {
        return res.status(404).json({ message: 'Le groupe n\'existe pas' });
    }
    res.status(200).json(group);
} catch (error) {
    console.error('Erreur lors de la récupération du groupe par ID :', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du groupe' });
}
}





async function remove(req, res) {
  const id = req.params.id;
  try {
    const page = await Page.findByIdAndDelete(id);
    if (!page) res.status(404).json({ error: "Couldn't find Page" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  const profileImage = req.files.profileImage ? req.files.profileImage[0].filename : undefined;
  const coverImage = req.files.coverImage ? req.files.coverImage[0].filename : undefined;

  try {
    let group = await Page.findById(id);

    if (!group) {
      return res.status(404).json({ error: "Couldn't find group" });
    }

    // Mettre à jour les champs nécessaires du groupe
    if (profileImage) {
      group.profileImage = profileImage;
    }
    if (coverImage) {
      group.coverImage = coverImage;
    }

    // Enregistrer les modifications
    group = await group.save();

    res.status(200).json(group);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
}




//async function participer(req, res) {
   // const { pageId } = req.params;
   // const userId = req.user._id; // Assurez-vous que vous avez un moyen d'obtenir l'ID de l'utilisateur connecté
  
    // Trouver la page par ID
    //const page = await Page.findById(pageId);
   // if (!page) {
    //  return res.status(404).json({ error: "Page not found" });
    //}
  
    // Ajouter l'utilisateur à la liste des participants
   // if (!page.participants.includes(userId)) {
     // page.participants.push(userId);
    //  try {
        //await page.save();
        //res.status(200).json({ message: "Participation successful" });
      //} catch (err) {
        //res.status(500).json({ error: "Server error" + err.message });
      
   
        
    
        

const getAllParticipantsPage = async (req, res, next) => {
    try {
      const { pageId } = req.params;
      const page = await Page.findById(pageId).populate("participants");
      const participants = page.participants;
      res.status(200).json({participants});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = { getall, getbyid, add, remove, update,participerAuGroupe,getAllParticipantsPage };
