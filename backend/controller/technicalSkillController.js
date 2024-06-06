var TechnicalSkill = require("../model/technicalSkill");
const technology = require("../model/technology");
var User = require("../model/user");

async function getallTechnicalSkills(req, res) {
  TechnicalSkill.find({})
    .exec()
    .then((technicalSkill) => {
      res.status(200).json(technicalSkill);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getTechnicalSkillbyid(req, res) {
  TechnicalSkill.findById(req.params.id)
    .exec()
    .then((technicalSkill) => {
      if (!technicalSkill) res.status(404).json({ error: "Couldn't find Technical Skill" });
      else res.status(200).json(technicalSkill);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function addTechnicalSkill(req, res) {
  const technicalSkill = req.body;
  const newItem = new TechnicalSkill(technicalSkill);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function removeTechnicalSkill(req, res) {
  const id = req.params.id;
  try {
    const technicalSkill = await TechnicalSkill.findByIdAndDelete(id);
    if (!technicalSkill) res.status(404).json({ error: "Couldn't find Technical Skill" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function updateTechnicalSkill(req, res) {
  const id = req.params.id;
  try {
    const technicalSkill = await TechnicalSkill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!technicalSkill) res.status(404).json({ error: "Couldn't find Technical Skill" });
    else res.status(200).json(technicalSkill);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}


// Méthode pour affecter une compétence technique à un utilisateur
const assignTechnicalSkillToUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { skillId, level, yearsOfExperience } = req.body;

    // Rechercher la compétence technique par ID
    const technicalSkill = await TechnicalSkill.findById(skillId);
    if (!technicalSkill) {
      throw new Error("Compétence technique non trouvée");
    }

    // Rechercher l'utilisateur par ID
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Vérifier si l'utilisateur est déjà assigné
    if (technicalSkill.users.includes(userId)) {
      throw new Error("L'utilisateur est déjà assigné à cette compétence technique");
    }

    // Ajouter l'utilisateur à la liste des utilisateurs de la compétence technique
    technicalSkill.users.push(userId);

    // Sauvegarder les modifications
    await technicalSkill.save();

    res.status(200).json({
      message: "Utilisateur affecté avec succès à la compétence technique",
      technicalSkill,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de l'affectation de la compétence technique à l'utilisateur",
      error: error.message,
    });
  }
};


const unassignTechnicalSkillFromUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { skillId } = req.body;

    // Rechercher la compétence technique par ID
    const technicalSkill = await TechnicalSkill.findById(skillId);
    if (!technicalSkill) {
      throw new Error("Compétence technique non trouvée");
    }

    // Vérifier si l'utilisateur est dans la liste des utilisateurs
    const userIndex = technicalSkill.users.findIndex(
      (user) => user.toString() === userId
    );
    if (userIndex === -1) {
      throw new Error(
        "L'utilisateur n'est pas assigné à cette compétence technique"
      );
    }

    // Supprimer l'utilisateur de la liste
    technicalSkill.users.splice(userIndex, 1);

    // Sauvegarder les modifications
    await technicalSkill.save();

    res.status(200).json({
      message: "Utilisateur désaffecté avec succès de la compétence technique",
      technicalSkill,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la désaffectation de l'utilisateur de la compétence technique",
      error: error.message,
    });
  }
};


// Méthode pour obtenir les compétences techniques associées à un utilisateur spécifique
// const getTechnicalSkillsByUser = async (req, res) => {
//   try {
//     const userId = req.params.userId; // Obtenir l'ID de l'utilisateur
//     console.log("ici"+userId)
//     const technicalSkills = await TechnicalSkill.find({
//       users: { $in: [userId] },
//     }); // Rechercher les compétences associées à l'utilisateur
//     console.log(technicalSkills);
//     res.status(200).json({
//       message: "Compétences techniques récupérées avec succès",
//       technicalSkills,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "Erreur lors de la récupération des compétences techniques pour l'utilisateur",
//       error: error.message, // Fournir des détails sur l'erreur
//     });
//   }
// };

const getTechnicalSkillsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Récupérer tous les documents TechnicalSkill
    const technicalSkills = await TechnicalSkill.find({})
      .populate('technology', 'name description') // Peupler le champ 'technology' avec les champs 'name' et 'description'
      .exec();

    // Filtrer les documents TechnicalSkill où l'utilisateur est présent dans le tableau users
    const userTechnicalSkills = technicalSkills.filter((technicalSkill) =>
      technicalSkill.users.some((user) => user.user.toString() === userId)
    );

    res.status(200).json({
      message: "Compétences techniques récupérées avec succès",
      technicalSkills: userTechnicalSkills,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la récupération des compétences techniques pour l'utilisateur",
      error: error.message,
    });
  }
};



// Méthode pour récupérer toutes les compétences techniques disponibles pour un utilisateur
const getAvailableTechnicalSkills = async (req, res) => {
  try {
    // Obtenir le userId depuis la requête (par exemple, via les paramètres ou le corps de la requête)
    const userId = req.params.userId || req.body.userId;

    if (!userId) {
      res.status(400).json({
        message: "userId est requis",
      });
    }

    // Rechercher les compétences techniques où le userId n'est pas dans le tableau users
    const availableTechnicalSkills = await TechnicalSkill.find({
      users: { $nin: [userId] }, // $nin signifie "not in"
    });

    res.status(200).json({
      message: "Compétences techniques disponibles récupérées avec succès",
      technicalSkills: availableTechnicalSkills,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la récupération des compétences techniques disponibles",
      error: error.message,
    });
  }
};


const getAvailableTechnologiesForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Récupérer les compétences techniques déjà associées à l'utilisateur
    const assignedTechnicalSkills = await TechnicalSkill.find({
      "users.user": userId,
    }).populate("technology");

    // Récupérer toutes les technologies disponibles
    const allTechnologies = await technology.find({});

    // Filtrer les technologies qui ne sont pas déjà associées à l'utilisateur
    const availableTechnologies = allTechnologies.filter(
      (technology) =>
        !assignedTechnicalSkills.some(
          (skill) => skill.technology._id.toString() === technology._id.toString()
        )
    );

    res.status(200).json({
      message: "Technologies disponibles récupérées avec succès",
      technologies: availableTechnologies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des technologies disponibles",
      error: error.message,
    });
  }
};

const removeUserFromTechnicalSkill = async (req, res) => {
  try {
    const userId = req.params.userId;
    const skillId = req.params.skillId;

    // Rechercher la compétence technique par ID
    const technicalSkill = await TechnicalSkill.findById(skillId);
    if (!technicalSkill) {
      throw new Error("Compétence technique non trouvée");
    }

    // Vérifier si l'utilisateur est dans la liste des utilisateurs
    const userIndex = technicalSkill.users.findIndex(
      (user) => user.user.toString() === userId
    );
    if (userIndex === -1) {
      throw new Error(
        "L'utilisateur n'est pas assigné à cette compétence technique"
      );
    }

    // Supprimer l'utilisateur de la liste
    technicalSkill.users.splice(userIndex, 1);

    // Sauvegarder les modifications
    await technicalSkill.save();

    res.status(200).json({
      message: "Utilisateur désaffecté avec succès de la compétence technique",
      technicalSkill,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Erreur lors de la désaffectation de l'utilisateur de la compétence technique",
      error: error.message,
    });
  }
};








module.exports = { 
  getallTechnicalSkills, 
  getTechnicalSkillbyid, 
  addTechnicalSkill, 
  removeTechnicalSkill, 
  updateTechnicalSkill, 
  assignTechnicalSkillToUser,
  unassignTechnicalSkillFromUser,
  getTechnicalSkillsByUser,
  getAvailableTechnicalSkills,
  getAvailableTechnologiesForUser,
  removeUserFromTechnicalSkill

};