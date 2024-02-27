var SocialSkill = require("../model/socialSkill");

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

module.exports = { getallSocialSkills, getSocialSkillbyid, addSocialSkill, removeSocialSkill, updateSocialSkill };
