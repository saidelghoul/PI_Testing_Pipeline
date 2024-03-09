const technicalSkill = require("../model/technicalSkill");
var TechnicalSkill = require("../model/technicalSkill");
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

// Contrôleur pour l'affectation des compétences sociales à un utilisateur
async function assignTechnicalSkillToUser(req, res) {

  try {
    const userId = req.params.userId;
    const { skillIds } = req.body;

    const user = await User.findById(userId);
    const technicalSkills = await technicalSkill.find({  _id: {$in:skillIds} });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (!technicalSkills) {
      return res.status(404).json({ error: 'Compétences techniques non trouvées' });
    }

    technicalSkills.forEach((technicalSkill)=>{
      
    user.technicalSkills.push(technicalSkill);
    });
    await user.save();

    return res.status(200).json({ message: 'Compétences techniques affectées à l"utilisateur avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de l"affectation des compétences sociales'+error.message });
  }
}

module.exports = { getallTechnicalSkills, getTechnicalSkillbyid, addTechnicalSkill, removeTechnicalSkill, updateTechnicalSkill, assignTechnicalSkillToUser};