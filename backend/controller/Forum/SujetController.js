
const Sujet = require ('../../model/Forum/Sujet')
const activitie = require("../../model/activity");
const User = require("../../model/user");

async function getall(req, res) {
    try {
        const sujets = await Sujet.find({})
            .populate({
                path: 'Creator',
                select: 'name profileImage' // Sélectionnez le champ 'name' du créateur
            })
            .populate({
                path: 'activity',
                select: 'name' // Sélectionnez le champ 'name' de l'activité
            })
            .exec();

        res.status(200).json(sujets);
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
}


  async function getallActivites(req, res) {
    try {
        const activities = await activitie.find({}, 'name'); // Récupère uniquement les noms des activités
        res.status(200).json(activities);
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
  }
  async function add(req, res) {
      const { title, content, Creator ,activity } = req.body;
      try {
        const user = await User.findById(Creator);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const group = await activitie.findById(activity);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
          const newSujet = new Sujet({ title, content, Creator, activity });
          await newSujet.save();
          res.status(201).json(newSujet);
      } catch (error) {
          res.status(400).json({ error: "Failed to add sujet: " + error.message });
      }
  }
  

async function update(req, res) {
    const { id } = req.params;
    const { title, content, Creator, activity } = req.body;

    try {
        const updatedSujet = await Sujet.findByIdAndUpdate(
            id,
            { title, content, Creator, activity },
            { new: true, runValidators: true }
        );
        if (!updatedSujet) {
            return res.status(404).json({ error: "Sujet not found" });
        }
        res.status(200).json(updatedSujet);
    } catch (error) {
        res.status(400).json({ error: "Failed to update sujet: " + error.message });
    }
}

async function deleteSujet(req, res) {
    const { id } = req.params;

    try {
        const deletedSujet = await Sujet.findByIdAndDelete(id);
        if (!deletedSujet) {
            return res.status(404).json({ error: "Sujet not found" });
        }
        res.status(200).json({ message: "Sujet deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete sujet: " + error.message });
    }
}
async function getbyid(req, res) {
    const sujetId = req.params.id;

    try {
        const sujet = await Sujet.findById(sujetId).populate('Creator activity'); // Utilisez populate si vous avez des références à d'autres modèles
        if (!sujet) {
            return res.status(404).json({ message: 'Sujet non trouvé' });
        }
        res.status(200).json(sujet);
    } catch (error) {
        console.error('Erreur lors de la récupération du sujet:', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
}

  module.exports = {  getall ,add,update,deleteSujet,getallActivites,getbyid};
