var SocialSkill = require("../model/socialSkill");
var User = require("../model/user");

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

/*async function getallSocialSkills(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const totalSocialSkills = await SocialSkill.countDocuments();
    const totalPages = Math.ceil(totalSocialSkills / limit);
    const offset = (page - 1) * limit;

    const socialSkills = await SocialSkill.find({})
      .skip(offset)
      .limit(limit)
      .exec();

    res.status(200).json({
      totalSocialSkills,
      totalPages,
      currentPage: page,
      socialSkills
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
}*/


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


/*async function assignSocialSkillToUser(req, res) {
  try {
    const userId = req.params.userId;
    const { skillIds } = req.body;

    const user = await User.findById(userId);
    const socialSkillsToAdd = await SocialSkill.find({ _id: { $in: skillIds } });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (!socialSkillsToAdd || socialSkillsToAdd.length === 0) {
      return res.status(404).json({ error: 'Compétences sociales non trouvées' });
    }

    const skillsAlreadyAssigned = [];

    // Vérification et ajout des compétences sociales non présentes dans le tableau
    socialSkillsToAdd.forEach((socialSkill) => {
      // Vérifie si la compétence sociale n'est pas déjà présente dans le tableau
      if (!user.socialSkills.some(existingSkill => existingSkill.equals(socialSkill._id))) {
        // Ajoute la compétence sociale avec la date d'attribution
        socialSkill.dateAttribution = new Date();
        user.socialSkills.push(socialSkill);
      } else {
        // Ajoute la compétence sociale à la liste des compétences déjà affectées
        skillsAlreadyAssigned.push(socialSkill.name);
      }
    });

    await user.save();

    const successMessage = 'Compétences sociales affectées à l"utilisateur avec succès';
    
    if (skillsAlreadyAssigned.length > 0) {
      return res.status(200).json({
        message: successMessage,
        warning: 'Certaines compétences étaient déjà affectées à l\'utilisateur.',
      });
    } else {
      return res.status(200).json({ message: successMessage });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de l"affectation des compétences sociales' + error.message });
  }
}*/

// Méthode pour affecter un SocialSkill à un utilisateur
const assignSocialSkillToUser = async (req, res) => {
  try {
    // Rechercher le SocialSkill par ID
    let socialSkill = await SocialSkill.findById(req.params.socialSkillId);
    console.log("l'id du socialSkill est :",socialSkill);
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




/*async function assignSocialSkillToUser(req, res) {
  try {
    const userId = req.params.userId;
    const { skillId } = req.body;

    const user = await User.findById(userId);
    const socialSkill = await SocialSkill.findById(skillId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (!socialSkill) {
      return res.status(404).json({ error: 'Compétence sociale non trouvée' });
    }

    // Vérifie si l'utilisateur est déjà assigné à cette compétence sociale
    if (socialSkill.users.includes(userId)) {
      return res.status(400).json({ error: 'L\'utilisateur est déjà assigné à cette compétence sociale' });
    }

    // Ajoute l'utilisateur à la liste des utilisateurs de la compétence sociale
    socialSkill.users.push(userId);
    // Met à jour la date d'attribution de la compétence sociale
    socialSkill.dateAttribution = new Date();
    // Sauvegarde la compétence sociale mise à jour
    await socialSkill.save();

    return res.status(200).json({ message: 'Utilisateur assigné à la compétence sociale avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de l\'assignation de l\'utilisateur à la compétence sociale' + error.message });
  }
}*/




/*async function unassignSocialSkillFromUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const { skillId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    const socialSkill = await SocialSkill.findById(skillId);

    if (!socialSkill) {
      return res.status(404).json({ error: 'Compétence sociale non trouvée' });
    }

    // Retrait de la compétence sociale de la liste socialSkills de l'utilisateur
    user.socialSkills.pull(skillId);
    await user.save();

    return res.status(200).json({ message: 'Compétence sociale désassignée de l"utilisateur avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de la désaffectation de la compétence sociale' + error.message });
  }
}*/

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




/*async function getSocialSkillsByUser(req, res, next) {
  try {
    //const user = await User.findById(req.params.userId).populate("socialSkills");
    
    const socialSkills = await SocialSkill.find({$in:{users:req.params.userId}});

    res.status(200).json({ title: "succes", message: socialSkills });
    //res.status(200).json({ title: "success", message: user.socialSkills });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}*/


// Méthode pour obtenir les SocialSkills associés à un utilisateur spécifique
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





/*const getUsersForSocialSkills = async (req, res) => {
  try {
    const users = await UserModel.aggregate([
      { $unwind: "$socialSkills" }, // décomposer la liste
      { 
        $group: { 
          _id: "$_id", 
          name: { $first: "$name" },
          totalSocialPoints: { $sum: "$socialSkills.pointSocial" } 
        } 
      }, // grouper par utilisateur et calculer la somme
    ]);
    if (users.length > 0) {
      res.status(200).json({ title: "success", message: users });
    } else {
      res.status(404).json({ title: "error", message: "No users found." });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
};*/

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
  getUsersForSocialSkills
   };