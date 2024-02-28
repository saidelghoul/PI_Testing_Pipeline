var TechnicalSkill = require("../model/technicalSkill");

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

module.exports = { getallTechnicalSkills, getTechnicalSkillbyid, addTechnicalSkill, removeTechnicalSkill, updateTechnicalSkill };