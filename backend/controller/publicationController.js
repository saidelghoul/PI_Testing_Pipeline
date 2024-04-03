var Publication = require("../model/publication");
const Commentaire = require("../model/commentair");

async function add(req, res) {
  const { sujet, contenu } = req.body; // Assurez-vous de récupérer creator correctement depuis req.body
  const userId = req.user.userId; // Assurez-vous que req.user contient les données de l'utilisateur authentifié

  const newItem = new Publication({
    creator:userId, // Utilisation de la valeur de creator récupérée depuis req.body
    Sujet: sujet,
    Contenue: contenu
  });

  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}


async function getall(req, res) {
  Publication.find({})
    .exec()
    .then((publication) => {
      res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getbyid(req, res) {
  Publication.findById(req.params.id)
    .exec()
    .then((publication) => {
      if (!publication)
        res.status(404).json({ error: "Couldn't find publication" });
      else res.status(200).json(publication);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
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
    const publication = await Publication.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!publication)
      res.status(404).json({ error: "Couldn't find publication" });
    else res.status(200).json(publication);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

//   async function getAllComments(id) {
//     try {
//       const publication = await Publication.findById(id);

//       if (!publication) {
//         return [];
//       }

//       const comments = await Commentaire.find({ publication: id });

//       return comments;
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//       throw error;
//     }
//   }
// }

async function addComment(req, res) {
  try {
    const { id } = req.params;

    const commentaire = new Commentaire({
      contenu: req.body.contenu,
    });

    const nouveauCommentaire = await commentaire.save();

    const publication = await Publication.findById(id);

    publication.commentaires.push(nouveauCommentaire._id);

    const publicationMiseAJour = await publication.save();

    res.json(publicationMiseAJour);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de l'ajout du commentaire à la publication",
    });
  }
}

module.exports = { getall, getbyid, add, remove, update, addComment };
