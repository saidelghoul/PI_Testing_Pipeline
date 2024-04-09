const Evenement = require("../model/Evenement");
var Commentaire = require("../model/commentair");
var Publication = require("../model/publication");
const User = require("../model/user");

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

async function getCommentByPub(req, res) {
  const publicationId = req.params.id;

  try {
    // Recherchez tous les commentaires associés à la publication spécifique
    const commentaires = await Commentaire.find({ publicationId })
      .populate("comments")
      .exec();

    // Renvoie la liste des commentaires en réponse à la demande
    res.json(commentaires);
  } catch (err) {
    // Gérez les erreurs
    console.error("Erreur lors de la récupération des commentaires :", err);
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

module.exports = { getCommentByPub, addToPub, addToEvent, remove, update };
