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


async function assignSocialSkillToUser(req, res) {
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
}


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




async function unassignSocialSkillFromUser(req, res, next) {
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
}

async function getSocialSkillsByUser(req, res, next) {
  try {
    const user = await User.findById(req.params.userId).populate("socialSkills");
    
    if (!user) {
      res.status(404).json({ title: "error", message: "Utilisateur non trouvé" });
    } else {
      res.status(200).json({ title: "success", message: user.socialSkills });
    }
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

async function getAvailableSocialSkills(req, res) {
  try {
    if (!req.params.userId) {
      return res.status(400).json({ error: "userId est requis" });
    }
    const userId = req.params.userId;

    // Recherche de l'utilisateur par son ID
    const user = await User.findById(userId).populate("socialSkills");

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Récupération de toutes les compétences sociales
    const allSocialSkills = await SocialSkill.find({});

    // Filtrer les compétences sociales disponibles
    const availableSkills = allSocialSkills.filter(socialSkill => {
      // Vérifier si la compétence sociale n'est pas déjà affectée à l'utilisateur
      return !user.socialSkills.some(existingSkill => existingSkill.equals(socialSkill._id));
    });

    return res.status(200).json(availableSkills);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Une erreur est survenue lors de la récupération des compétences sociales disponibles",message:error.message });
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
  getAvailableSocialSkills };
