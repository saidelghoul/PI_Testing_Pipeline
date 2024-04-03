const Evenement = require("../model/Evenement");
var Commentaire = require("../model/commentair");
const publication = require("../model/publication");

// retrieve comment of each event
async function getCommentsByEventId(eventId) {
  try {
    const comments = await Commentaire.find({ evenementId: eventId }).exec();
    return comments;
  } catch (error) {
    throw new Error("Error retrieving comments: " + error.message);
  }
}

async function getCommentsByEvent(req, res) {
  const eventId = req.params.id;
  try {
    const comments = await getCommentsByEventId(eventId);
    res.json(comments);
    console.log(comments);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

// retrieve comment of each publication
async function getCommentsByPubtId(pubId) {
  try {
    const comments = await Commentaire.find({ publicationId: pubId }).exec();
    return comments;
  } catch (error) {
    throw new Error("Error retrieving comments: " + error.message);
  }
}

async function getCommentsByPub(req, res) {
  const pubId = req.params.id;
  try {
    const comments = await getCommentsByPubtId(pubId);
    res.json(comments);
    console.log(comments);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const commentaire = await Commentaire.findByIdAndDelete(id);
    if (!Commentaire)
      res.status(404).json({ error: "Couldn't find Commentaire" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

//update commentaire
async function update(req, res) {
  const id = req.params.id;
  try {
    const Commentaire = await Commentaire.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!Commentaire)
      res.status(404).json({ error: "Couldn't find Commentaire" });
    else res.status(200).json(Commentaire);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

//add commentaire to pub
async function addToPub(req, res) {
  const commentaire = req.body;
  const id = req.params.id;

  try {
    const pub = await publication.findById(id);
    if (!pub) return res.status(404).json({ error: "publication not found" });
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }

  const newCommentaire = new Commentaire({
    publicationId: id,
    ...commentaire,
  });

  try {
    const savedCommentaire = await newCommentaire.save();
    res.status(201).json(savedCommentaire);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
}

//add commentaire to event
async function addToEvent(req, res) {
  const commentaire = req.body;
  const id = req.params.id;

  try {
    const event = await Evenement.findById(id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Server error: " + err.message });
  }
  const newCommentaire = new Commentaire({
    evenementId: id,
    ...commentaire,
  });

  try {
    const savedCommentaire = await newCommentaire.save();
    res.status(201).json(savedCommentaire);
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
}

module.exports = {
  getCommentsByEvent,
  getCommentsByPub,
  remove,
  update,
  addToPub,
  addToEvent,
};
