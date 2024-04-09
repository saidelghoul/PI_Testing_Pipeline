var Publication = require("../model/publication");
const User = require("../model/user");

async function add(req, res) {
  const { sujet, contenu, creator: userId } = req.body;

  try {
    // Récupérer l'utilisateur connecté pour associer à la publication
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Créer une nouvelle publication en associant l'utilisateur connecté
    const newPublication = new Publication({
      Sujet: sujet,
      Contenue: contenu,
      creator: userId, // Associer l'ID de l'utilisateur connecté à la publication
    });

    // Enregistrer la nouvelle publication
    const savedPublication = await newPublication.save();

    res.status(201).json(savedPublication);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function getall(req, res) {
  Publication.find({})
    .populate({
      path: "comments",
      select: "contenu creator DateCreation",
      // Sélectionnez les champs de commentaire nécessaires
      populate: {
        path: "creator", // Chemin vers le modèle d'utilisateur associé
        select: "name", // Sélectionnez le champ de nom d'utilisateur
      },
    })
    .exec()
    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getbyid(req, res) {
  try {
    const pubId = req.params.id;
    const pub = await Publication.findById(pubId);
    if (!pub) {
      return res.status(404).json({ message: "Le groupe n'existe pas" });
    }
    res.status(200).json(pub);
  } catch (error) {
    console.error("Erreur lors de la récupération du groupe par ID :", error);
    res
      .status(500)
      .json({
        error: "Une erreur s'est produite lors de la récupération du groupe",
      });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const publication = await Publication.findByIdAndDelete(id);
    if (!publication)
      res.status(404).json({ error: "Couldn't find publication" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const publication = await Publication.findById(id);
    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }

    // Mettez à jour les champs nécessaires de la publication
    publication.Sujet = req.body.Sujet;
    publication.Contenue = req.body.Contenue;

    // Enregistrez les modifications
    const updatedPublication = await publication.save();

    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

module.exports = { getall, getbyid, add, remove, update };
