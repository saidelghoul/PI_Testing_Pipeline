const Evenement = require("../model/Evenement");
const publication = require("../model/publication");

async function getEventReportbyid(req, res) {
  try {
    let nbOfAlertOnEvents = 0;
    // let nbOfAlertOnPosts = 0;

    const userId = req.params.id;
    const allEvents = await Evenement.find({})
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
    // const allPosts

    nbOfAlertOnEvents = await Promise.all(
      allEvents.map(async (publication) => {
        const creatorId = publication.creator;
        console.log(userId, "===", creatorId);
        if (userId === creatorId.toString()) {
          console.log("->", publication.reports?.length);
          return publication.reports?.length || 0;
        } else return 0; // Return 0 if the user is not the creator
      })
    );

    // nbOfAlertOnPosts = ....

    const totalReports = nbOfAlertOnEvents.reduce((acc, val) => acc + val, 0); // + nbOfAlertOnPosts.reduce((acc, val) => acc + val, 0);
    console.log("totalReports : ", totalReports);

    res.status(200).json(totalReports);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
async function getEventLiketbyid(req, res) {
  try {
    let nbOfLikeOnEvents = 0;

    const userId = req.params.id;
    const allEvents = await Evenement.find({})
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

    nbOfLikeOnEvents = await Promise.all(
      allEvents.map(async (publication) => {
        const creatorId = publication.creator;
        console.log(userId, "===", creatorId);
        if (userId === creatorId.toString()) {
          console.log("->", publication.likes?.length);
          return publication.likes?.length || 0;
        } else return 0; // Return 0 if the user is not the creator
      })
    );

    const totalLikes = nbOfLikeOnEvents.reduce((acc, val) => acc + val, 0); // + nbOfAlertOnPosts.reduce((acc, val) => acc + val, 0);
    console.log("totalReports : ", totalLikes);

    res.status(200).json(totalLikes);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
async function getEventDesliketbyid(req, res) {
  try {
    let nbOfDeslikeOnEvents = 0;

    const userId = req.params.id;
    const allEvents = await Evenement.find({})
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

    nbOfDeslikeOnEvents = await Promise.all(
      allEvents.map(async (publication) => {
        const creatorId = publication.creator;
        console.log(userId, "===", creatorId);
        if (userId === creatorId.toString()) {
          console.log("->", publication.deslikes?.length);
          return publication.deslikes?.length || 0;
        } else return 0; // Return 0 if the user is not the creator
      })
    );

    const totalDeslikes = nbOfDeslikeOnEvents.reduce(
      (acc, val) => acc + val,
      0
    ); // + nbOfAlertOnPosts.reduce((acc, val) => acc + val, 0);
    console.log("totalReports : ", totalDeslikes);

    res.status(200).json(totalDeslikes);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

async function getPubReportsbyid(req, res) {
  try {
    let nbOfAlertOnPosts = 0;

    const userId = req.params.id;
    const allPosts = await publication
      .find({})
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
    // const allPosts

    nbOfAlertOnPosts = await Promise.all(
      allPosts.map(async (publication) => {
        const creatorId = publication.creator;
        console.log(userId, "===", creatorId);
        if (userId === creatorId.toString()) {
          console.log("->", publication.reports?.length);
          return publication.reports?.length || 0;
        } else return 0; // Return 0 if the user is not the creator
      })
    );

    // nbOfAlertOnPosts = ....

    const totalReports = nbOfAlertOnPosts.reduce((acc, val) => acc + val, 0); // + nbOfAlertOnPosts.reduce((acc, val) => acc + val, 0);
    console.log("totalReports : ", totalReports);

    res.status(200).json(totalReports);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
async function getPubLiketbyid(req, res) {
  try {
    let nbOfLikeOnEvents = 0;

    const userId = req.params.id;
    const allEvents = await publication
      .find({})
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

    nbOfLikeOnEvents = await Promise.all(
      allEvents.map(async (publication) => {
        const creatorId = publication.creator;
        console.log(userId, "===", creatorId);
        if (userId === creatorId.toString()) {
          console.log("->", publication.likes?.length);
          return publication.likes?.length || 0;
        } else return 0; // Return 0 if the user is not the creator
      })
    );

    const totalLikes = nbOfLikeOnEvents.reduce((acc, val) => acc + val, 0); // + nbOfAlertOnPosts.reduce((acc, val) => acc + val, 0);
    console.log("totalReports : ", totalLikes);

    res.status(200).json(totalLikes);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
async function getPubtDesliketbyid(req, res) {
  try {
    let nbOfDeslikeOnEvents = 0;

    const userId = req.params.id;
    const allEvents = await publication
      .find({})
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

    nbOfDeslikeOnEvents = await Promise.all(
      allEvents.map(async (publication) => {
        const creatorId = publication.creator;
        console.log(userId, "===", creatorId);
        if (userId === creatorId.toString()) {
          console.log("->", publication.deslikes?.length);
          return publication.deslikes?.length || 0;
        } else return 0; // Return 0 if the user is not the creator
      })
    );

    const totalDeslikes = nbOfDeslikeOnEvents.reduce(
      (acc, val) => acc + val,
      0
    ); // + nbOfAlertOnPosts.reduce((acc, val) => acc + val, 0);
    console.log("totalReports : ", totalDeslikes);

    res.status(200).json(totalDeslikes);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}

module.exports = {
  getEventReportbyid,
  getEventLiketbyid,
  getEventDesliketbyid,

  getPubReportsbyid,
  getPubLiketbyid,
  getPubtDesliketbyid,
};
