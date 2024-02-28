var Page = require("../model/page");

async function getall(req, res) {
  Page.find({})
    .exec()
    .then((page) => {
      res.status(200).json(page);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function getbyid(req, res) {
  Page.findById(req.params.id)
    .exec()
    .then((page) => {
      if (!page) res.status(404).json({ error: "Couldn't find Page" });
      else res.status(200).json(page);
    })
    .catch((error) => {
      res.status(500).json({ error: "Server error: " + error.message });
    });
}

async function add(req, res) {
  const page = req.body;
  const newItem = new Page(page);
  try {
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function remove(req, res) {
  const id = req.params.id;
  try {
    const page = await Page.findByIdAndDelete(id);
    if (!page) res.status(404).json({ error: "Couldn't find Page" });
    else res.status(204).json({ info: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}

async function update(req, res) {
  const id = req.params.id;
  try {
    const page = await Page.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!page) res.status(404).json({ error: "Couldn't find Page" });
    else res.status(200).json(page);
  } catch (err) {
    res.status(500).json({ error: "Server error" + err.message });
  }
}
//async function participer(req, res) {
   // const { pageId } = req.params;
   // const userId = req.user._id; // Assurez-vous que vous avez un moyen d'obtenir l'ID de l'utilisateur connecté
  
    // Trouver la page par ID
    //const page = await Page.findById(pageId);
   // if (!page) {
    //  return res.status(404).json({ error: "Page not found" });
    //}
  
    // Ajouter l'utilisateur à la liste des participants
   // if (!page.participants.includes(userId)) {
     // page.participants.push(userId);
    //  try {
        //await page.save();
        //res.status(200).json({ message: "Participation successful" });
      //} catch (err) {
        //res.status(500).json({ error: "Server error" + err.message });
      //}
    //}
  //}
  async function participer(req, res) {
    const { pageId } = req.params;
    const {userId} = req.params; // Assurez-vous que vous avez un moyen d'obtenir l'ID de l'utilisateur connecté
  
    // Trouver la page par ID
    const page = await Page.findById(pageId);
    if (!page) {
      return res.status(404).json({ error: "Page not found" });
    }
  
    // Ajouter l'utilisateur à la liste des participants
    if (!page.participants.includes(userId)) {
      page.participants.push(userId);
      try {
        await page.save();
        res.status(200).json({ message: "Participation successful" });
      } catch (err) {
        res.status(500).json({ error: "Server error" + err.message });
      }
    }
    
}
const getAllParticipantsPage = async (req, res, next) => {
    try {
      const { pageId } = req.params;
      const page = await Page.findById(pageId).populate("participants");
      const participants = page.participants;
      res.status(200).json({participants});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

module.exports = { getall, getbyid, add, remove, update,participer,getAllParticipantsPage };
