var Evenement = require("../model/Evenement");
const moment = require("moment");
const Commentaire = require("../model/commentair");

async function add(req, res) {
  const evenement = req.body;
  const newItem = new Evenement(evenement);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function getall(req, res) {
  Evenement.find({})
    .exec()
    .then((evenement) => {
      res.status(200).json(evenement);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getbyid(req, res) {
  Evenement.findById(req.params.id)
    .exec()
    .then((evenement) => {
      if (!evenement) res.status(404).json({ error: "Couldn't find event" });
      else res.status(200).json(evenement);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const evenement = await Evenement.findByIdAndDelete(id);
    if (!evenement) res.status(404).json({ error: "Couldn't find event" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const evenement = await Evenement.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!evenement) res.status(404).json({ error: "Couldn't find event" });
    else res.status(200).json(evenement);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function remove2(req, res) {
  const id = req.params.id;
  try {
    const evenement = await Evenement.findById(id);
    if (!evenement)
      return res.status(404).json({ error: "Couldn't find event" });

    const dateDebut = evenement.dateDebut;
    const currentDate = Date.now;
    const diffInDays = moment(dateDebut).diff(currentDate, "days");

    if (diffInDays < 4) {
      console.log(`Difference in days: ${diffInDays}`);
      return res.status(400).json({ error: "  Too late to delete" });
    }

    const deletedEvent = await Evenement.findByIdAndDelete(id);
    if (!deletedEvent)
      return res.status(404).json({ error: "Couldn't find event" });

    res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}
async function addComment(req, res) {
  try {
    const { id } = req.params;

    const commentaire = new Commentaire({
      contenu: req.body.contenu,
    });

    const nouveauCommentaire = await commentaire.save();

    const evenement = await Evenement.findById(id);

    evenement.commentaires.push(nouveauCommentaire._id);

    const evenementMiseAJour = await evenement.save();

    res.json(evenementMiseAJour);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de l'ajout du commentaire à la publication",
    });
  }
}

module.exports = { getall, getbyid, add, remove, update, remove2, addComment };
