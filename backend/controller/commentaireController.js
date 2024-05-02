const Evenement = require("../model/Evenement");
const Commentaire = require("../model/commentair");
const Publication = require("../model/publication");
const User = require("../model/user");

async function getCommentsByEvent(req, res) {
  const eventId = req.params.id;
  try {
    const commentaires = await Commentaire.find({ eventId })
      .populate("comments")
      .exec();
    res.json(commentaires);
  } catch (err) {
    console.error("Erreur when fetching comments :", err);
    res.status(500).json({ error: "Server error" });
  }
}

async function getCommentByPub(req, res) {
  const publicationId = req.params.id;
  try {
    const commentaires = await Commentaire.find({ publicationId })
      .populate("comments")
      .exec();
    res.json(commentaires);
  } catch (err) {
    console.error("Erreur when fetching comments  :", err);
    res.status(500).json({ error: "Server error" });
  }
}

async function addToPub(req, res) {
  const { contenu, creator: userId } = req.body;
  const publicationId = req.params.id;

  try {
    // Vérifiez si l'utilisateur existe

    // Vérifiez si la publication existe
    const publication = await Publication.findById(publicationId);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Créez un nouveau commentaire
    const newCommentaire = new Commentaire({
      publicationId,
      creator: userId, // Utilisez l'ID de l'utilisateur connecté en tant que créateur du commentaire
      contenu,
    });

    // Enregistrez le nouveau commentaire
    const savedCommentaire = await newCommentaire.save();
    publication.comments.push(savedCommentaire);
    await publication.save();
    res.status(201).json(savedCommentaire);
  } catch (err) {
    // Gérez les erreurs
    res.status(500).json({ error: "Server error: " + err.message });
  }
}

async function addToEvent(req, res) {
  const { contenu, creator: userId } = req.body;
  const evenementId = req.params.id;

  try {
    const event = await Evenement.findById(evenementId);
    if (!event) {
      return res.status(404).json({ error: "Publication not found" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Créez un nouveau commentaire
    const newCommentaire = new Commentaire({
      evenementId,
      creator: userId, // Utilisez l'ID de l'utilisateur connecté en tant que créateur du commentaire
      contenu,
    });

    // Enregistrez le nouveau commentaire
    const savedCommentaire = await newCommentaire.save();
    event.comments.push(savedCommentaire);
    await event.save();
    res.status(201).json(savedCommentaire);
  } catch (err) {
    // Gérez les erreurs
    res.status(500).json({ error: "Server error: " + err.message });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const commentaire = await Commentaire.findByIdAndDelete(id);
    if (!Commentaire) res.status(404).json({ error: "Couldn't find comment" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const Commentaire = await Commentaire.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!Commentaire) res.status(404).json({ error: "Couldn't find comment" });
    else res.status(200).json(Commentaire);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function reportComment(req, res) {
  const id = req.params.id;
  const userId = req.body.userId;

  try {
    const commentaire = await Commentaire.findById(id);
    if (!commentaire) {
      return res.status(404).json({ error: "commentaire not found" });
    }

    // Check if userId already exists in the deslikes array
    const index = commentaire.reports.indexOf(userId);
    if (index !== -1) {
      // If userId exists, remove it from the deslikes array
      commentaire.reports.splice(index, 1);
    } else {
      // If userId doesn't exist, add it to the deslikes array
      commentaire.reports.push(userId);
    }

    // Enregistrez les modifications
    const updatedCommentaire = await commentaire.save();
    res.status(200).json(updatedCommentaire);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

module.exports = {
  getCommentByPub,
  getCommentsByEvent,
  addToPub,
  addToEvent,
  remove,
  update,
  reportComment,
};
