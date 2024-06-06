var SocialSkill = require("../model/socialSkill");
var User = require("../model/user");
const DepartmentModel = require('../model/departement'); // Assurez-vous que le chemin est correct
const UniteModel = require('../model/unite'); // Assurez-vous que le chemin est correct

async function getallSocialSkills(req, res) {
  SocialSkill.find({})
    .exec()
    .then((socialSkill) => {
      res.status(200).json(socialSkill);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}


async function getSocialSkillbyid(req, res) {
  SocialSkill.findById(req.params.id)
    .exec()
    .then((socialSkill) => {
      if (!socialSkill) res.status(404).json({ error: "Couldn't find SocialSkill" });
      else res.status(200).json(socialSkill);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function addSocialSkill(req, res) {
  const socialSkill = req.body;
  const newItem = new SocialSkill(socialSkill);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function removeSocialSkill(req, res) {
  const id = req.params.id;
  try {
    const socialSkill = await SocialSkill.findByIdAndDelete(id);
    if (!socialSkill) res.status(404).json({ error: "Couldn't find Social Skill" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function updateSocialSkill(req, res) {
  const id = req.params.id;
  try {
    const socialSkill = await SocialSkill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!socialSkill) res.status(404).json({ error: "Couldn't find Social Skill" });
    else res.status(200).json(socialSkill);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}



// Méthode pour affecter un SocialSkill à un utilisateur
const assignSocialSkillToUser = async (req, res) => {
  const { assignedBy } = req.body; // ID de l'utilisateur qui attribue

  try {
    // Rechercher le SocialSkill par ID
    let socialSkill = await SocialSkill.findById(req.params.socialSkillId);
    if (!socialSkill) {
      throw new Error('SocialSkill non trouvé');
    }

    // Rechercher l'utilisateur par ID
    let user = await User.findById(req.params.userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Vérifier si l'utilisateur est déjà assigné
    if (socialSkill.users.includes(req.params.userId)) {
      throw new Error('L\'utilisateur est déjà assigné à ce SocialSkill');
    }

    // Ajouter l'utilisateur à la liste des utilisateurs du SocialSkill
    socialSkill.users.push(req.params.userId);

    // Mettre à jour "assignedBy" avec l'utilisateur qui a attribué
    socialSkill.assignedBy = assignedBy;

    // Sauvegarder les modifications
    await socialSkill.save();

    res.status(200).send( {
      message: 'Utilisateur affecté avec succès au SocialSkill',
      socialSkill,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Erreur lors de l\'affectation du SocialSkill à l\'utilisateur',
      error: error.message,
    }) ;
  }
};



// Méthode pour désaffecter un utilisateur d'un SocialSkill
const unassignSocialSkillFromUser = async (req, res) => {
  try {
    // Rechercher le SocialSkill par ID
    let socialSkill = await SocialSkill.findById(req.params.socialSkillId);
    if (!socialSkill) {
      throw new Error('SocialSkill non trouvé');
    }

    // Vérifier si l'utilisateur est dans la liste des utilisateurs
    const userIndex = socialSkill.users.indexOf(req.params.userId);
    if (userIndex === -1) {
      throw new Error("L'utilisateur n'est pas assigné à ce SocialSkill");
    }

    // Supprimer l'utilisateur de la liste
    socialSkill.users.splice(userIndex, 1);

    // Sauvegarder les modifications
    await socialSkill.save();

     res.status(200).send({
      message: 'Utilisateur désaffecté avec succès du SocialSkill',
      socialSkill,
    }) ;
  } catch (error) {
     res.status(500).send( {
      message: "Erreur lors de la désaffectation de l'utilisateur du SocialSkill",
      error: error.message,
    });
  }
};


// Méthode pour obtenir les SocialSkills associés à un utilisateur spécifique
const getSocialSkillsByUser = async (req, res) => {
  try {
    const userId = req.params.userId; // Obtenir l'ID de l'utilisateur
    const socialSkills = await SocialSkill.find({ users: { $in: [userId] } }); // Rechercher les compétences associées à l'utilisateur

    if (socialSkills.length >= 0) {
      res.status(200).json({
        message: "SocialSkills récupérés avec succès",
        socialSkills, // Retourner une liste vide
      });
      return; // Arrêter l'exécution après avoir envoyé la réponse
    }

  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des SocialSkills pour l'utilisateur",
      error: error.message, // Fournir des détails sur l'erreur
    });
    return; // Empêcher l'envoi de réponses supplémentaires
  }
};






// Méthode pour récupérer tous les SocialSkills disponibles pour un utilisateur
const getAvailableSocialSkills = async (req, res) => {
  try {
    // Obtenir le userId depuis la requête (par exemple, via les paramètres ou le corps de la requête)
    const userId = req.params.userId || req.body.userId;

    if (!userId) {
       res.status(400).json({
        message: 'userId est requis',
      });
    }

    // Rechercher les SocialSkills où le userId n'est pas dans le tableau users
    const availableSocialSkills = await SocialSkill.find({
      users: { $nin: [userId] }, //  signifie "not in"
    });

    res.status(200).json({
      message: 'SocialSkills disponibles récupérés avec succès',
      socialSkills: availableSocialSkills,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des SocialSkills disponibles",
      error: error.message,
    });
  }
};

// Méthode pour calculer la somme des points sociaux pour un utilisateur
const getUsersForSocialSkills = async (req, res) => {
  try {
    // Obtenir le userId depuis les paramètres de la requête ou le corps de la requête
    const userId = req.params.userId || req.body.userId;

    if (!userId) {
      return res.status(400).json({
        message: 'userId est requis',
      });
    }

    // Récupérer tous les SocialSkills où l'utilisateur est dans la liste des utilisateurs
    const socialSkills = await SocialSkill.find({
      users: { $in: [userId] },
    });

    if (socialSkills.length === 0) {
      return res.status(404).json({
        message: 'Aucun SocialSkill trouvé pour cet utilisateur',
      });
    }

    // Calculer la somme des points sociaux
    const totalSocialPoints = socialSkills.reduce((total, skill) => {
      return total + (skill.pointSocial || 0); // S'assure que pointSocial est bien un nombre
    }, 0);

    res.status(200).json({
      message: 'Somme des points sociaux calculée avec succès',
      totalSocialPoints,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du calcul des points sociaux",
      error: error.message,
    });
  }
};

// Méthode pour obtenir le nom du département par ID
async function GetDepartmentNameById(req, res) {
  try {
    const departmentId = req.params.id; // Récupérer l'ID du département
    const department = await DepartmentModel.findById(departmentId); // Chercher le département par ID

    if (!department) {
      res.status(404).json({ message: "Département non trouvé" }); // Réponse si le département n'est pas trouvé
    } else {
      res.status(200).json({ name: department.name }); // Réponse avec le nom du département
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du département", error: error.message }); // Gestion des erreurs
  }
}

// Méthode pour obtenir le nom de l'unité par ID
async function GetUniteNameById(req, res) {
  try {
    const uniteId = req.params.id; // Récupérer l'ID de l'unité
    const unite = await UniteModel.findById(uniteId); // Chercher l'unité par ID

    if (!unite) {
      res.status(404).json({ message: "Unité non trouvée" }); // Réponse si l'unité n'est pas trouvée
    } else {
      res.status(200).json({ name: unite.name }); // Réponse avec le nom de l'unité
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'unité", error: error.message }); // Gestion des erreurs
  }
}








module.exports = { 
  getallSocialSkills, 
  getSocialSkillbyid, 
  addSocialSkill, 
  removeSocialSkill, 
  updateSocialSkill, 
  assignSocialSkillToUser,
  unassignSocialSkillFromUser,
  getSocialSkillsByUser,
  getAvailableSocialSkills,
  getUsersForSocialSkills,
  GetDepartmentNameById,
  GetUniteNameById
   };