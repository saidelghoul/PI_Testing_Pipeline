const Evenement = require("../model/Evenement");
const moment = require("moment");
const User = require("../model/user");

async function add(req, res) {
  const eventImage = req.files.image ? req.files.image[0] : undefined;

  const {
    titre,
    contenu,
    datedeb,
    datefin,
    cap,
    prix,
    creator: userId,
  } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found " });
    }

    // Vérifier les conditions de date
    if (new Date(datefin) <= new Date(datedeb)) {
      return res.status(400).json({
        error: "The start Date should be earlier then the finish Date ",
      });
    }
    if (new Date(datedeb) <= new Date()) {
      return res.status(400).json({
        error: "You can't fixe an event Today or in a passed Date ",
      });
    }

    // Créer une nouvelle publication (événement)
    const newEvent = new Evenement({
      Titre: titre,
      Contenu: contenu,
      DateDebut: datedeb,
      DateFin: datefin,
      Capacite: cap,
      Prix: prix,
      ImagePath: eventImage?.filename,
      creator: userId, // Associer l'ID de l'utilisateur connecté à la publication
    });

    // Enregistrer la nouvelle publication
    const savedEvent = await newEvent.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: "Erreur du serveur: " + error.message });
  }
}

async function getall(req, res) {
  try {
    const publications = await Evenement.find({})
      .populate({
        path: "comments",
        select: "contenu creator DateCreation",
        // Sélectionnez les champs de commentaire nécessaires
        populate: {
          path: "creator", // Chemin vers le modèle d'utilisateur associé
          select: "name", // Sélectionnez le champ de nom d'utilisateur
        },
      })
      .exec();

    const mappedPublications = await Promise.all(
      publications.map(async (publication) => {
        const creatorId = publication.creator;
        const user = await User.findById(creatorId);
        const mappedPublication = {
          ...publication.toObject(),
          creator: {
            _id: user._id,
            name: user.name,
          },
        };
        return mappedPublication;
      })
    );

    res.status(200).json(mappedPublications);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function getbyid(req, res) {
  try {
    const pubId = req.params.id;
    const pub = await Evenement.findById(pubId);
    if (!pub) {
      return res.status(404).json({ message: "Le groupe n'existe pas" });
    }
    res.status(200).json(pub);
  } catch (error) {
    console.error("Erreur lors de la récupération du groupe par ID :", error);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération du groupe",
    });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const currentDate = new Date(); // Obtenez la date actuelle
    req.body.DatePublication = currentDate; // Mettez à jour la DatePublication avec la date actuelle
    const evenement = await Evenement.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!evenement) res.status(404).json({ error: "Couldn't find event" });
    else res.status(200).json(evenement);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const evenement = await Evenement.findById(id);
    if (!evenement)
      return res.status(404).json({ error: "Couldn't find event" });

    const dateDebut = evenement.DateDebut;
    const currentDate = Date.now();
    const diffInDays = moment(dateDebut).diff(currentDate, "days");
    console.log("mes", { diffInDays });

    if (diffInDays < 4) {
      console.log(`Difference in days: ${diffInDays}`);
      return res.status(400).json({
        error: `Too late to delete the event starts in ${diffInDays} days `,
      });
    }

    const deletedEvent = await Evenement.findByIdAndDelete(id);
    if (!deletedEvent)
      return res.status(404).json({ error: "Couldn't find event" });

    res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function likePost(req, res) {
  const id = req.params.id;
  const userId = req.body.userId;

  try {
    const evenement = await Evenement.findById(id);
    if (!evenement) {
      return res.status(404).json({ error: "Publication not found" });
    }

    const index = evenement.likes.indexOf(userId);
    const indexDeslike = evenement.deslikes.indexOf(userId);

    if (index !== -1) {
      evenement.likes.splice(index, 1);
    } else {
      if (indexDeslike !== -1) {
        evenement.deslikes.splice(index, 1);
      }
      evenement.likes.push(userId);
    }

    const updatedPublication = await evenement.save();

    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function deslikePost(req, res) {
  const id = req.params.id;
  const userId = req.body.userId;

  try {
    const evenement = await Evenement.findById(id);
    if (!evenement) {
      return res.status(404).json({ error: "Publication not found" });
    }

    const index = evenement.deslikes.indexOf(userId);
    const indexLike = evenement.likes.indexOf(userId);

    if (index !== -1) {
      evenement.deslikes.splice(index, 1);
    } else {
      if (indexLike !== -1) {
        evenement.likes.splice(index, 1);
      }
      evenement.deslikes.push(userId);
    }

    const updatedPublication = await evenement.save();

    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function reportPost(req, res) {
  const id = req.params.id;
  const userId = req.body.userId;

  try {
    const evenement = await Evenement.findById(id);
    if (!evenement) {
      return res.status(404).json({ error: "Publication not found" });
    }

    const index = evenement.reports.indexOf(userId);
    if (index !== -1) {
      evenement.reports.splice(index, 1);
    } else {
      evenement.reports.push(userId);
    }

    const updatedPublication = await evenement.save();

    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function CreateReservation(req, res) {
  const id = req.params.id;
  const userId = req.body.userId;

  try {
    const evenement = await Evenement.findById(id);
    if (!evenement) {
      return res.status(404).json({ error: "Publication not found" });
    }

    const index = evenement.reservations.indexOf(userId);
    let message;

    if (index !== -1) {
      evenement.reservations.splice(index, 1);
      message = "Reservation removed";
    } else {
      evenement.reservations.push(userId);
      message = "Reservation added";
    }

    const updatedPublication = await evenement.save();

    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

module.exports = {
  getall,
  getbyid,
  add,
  update,
  remove,
  likePost,
  deslikePost,
  reportPost,
  CreateReservation,
};
