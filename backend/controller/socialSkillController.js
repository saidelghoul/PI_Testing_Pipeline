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


// Contrôleur pour l'affectation des compétences sociales à un utilisateur
async function assignSocialSkillToUser(req, res) {

  try {
    const userId = req.params.userId;
    const { skillIds } = req.body;

    const user = await User.findById(userId);
    const socialSkills = await SocialSkill.find({  _id: {$in:skillIds} });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    if (!socialSkills) {
      return res.status(404).json({ error: 'Compétences sociales non trouvées' });
    }

    socialSkills.forEach((socialSkill)=>{
      
    user.socialSkills.push(socialSkill);
    });
    await user.save();

    return res.status(200).json({ message: 'Compétences sociales affectées à l"utilisateur avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de l"affectation des compétences sociales'+error.message });
  }
}

module.exports = { getallSocialSkills, getSocialSkillbyid, addSocialSkill, removeSocialSkill, updateSocialSkill, assignSocialSkillToUser };
