const CommentGroups = require("../../model/Groups/CommentGroups");
const User = require("../../model/user");
const pubGroups = require("../../model/Groups/pubGroups");

async function add(req, res) {
    const postId=req.params.postId
    const { contenu, creator: userId} = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const post = await pubGroups.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Publication not found" });
        }

        const newComment = new CommentGroups({
            contenue: contenu,
            creator: userId,
            publicationId: postId,
        });
        const savedComment = await newComment.save();

        // Ajouter l'ID du nouveau commentaire à la liste des commentaires de la publication
        post.comments.push(savedComment._id);
        await post.save();

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
}

async function getAlls(req, res) {
    try {
        const postId = req.params.postId;
        const comments = await CommentGroups.find({ publicationId: postId })
            .populate({
                path: "creator", // Populer le champ "creator" pour obtenir les détails de l'utilisateur
                select: "name profileImage" // Sélectionner les champs à inclure dans les détails de l'utilisateur
            });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function remove(req, res) {
    const commentId = req.params.commentId;
    try {
      const Pubpage = await CommentGroups.findByIdAndDelete(commentId);
      if (!Pubpage) res.status(404).json({ error: "Couldn't find Pub" });
      else res.status(204).json({ info: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error" + err.message });
    }
  }

  async function getbyid(req, res) {
    try {
      const commentId = req.params.commentId;
      const pub = await CommentGroups.findById(commentId);
      if (!pub) {
          return res.status(404).json({ message: 'Le pub n\'existe pas' });
      }
      res.status(200).json(pub);
  } catch (error) {
      console.error('Erreur lors de la récupération du pub par ID :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du groupe' });
  }
  }

  async function update(req, res) {
    const { contenu } = req.body;
    const commentId = req.params.commentId;
  
    try {
      // Vérifiez d'abord si la publication existe
      const comment = await CommentGroups.findById(commentId);
      if (!comment) {
        return res.status(404).json({ message: "La publication n'existe pas" });
      }
  
      // Mettez à jour les champs de la publication
      comment.contenue = contenu; // Modifiez le champ selon votre modèle de données
  
      // Enregistrez la publication mise à jour dans la base de données
      const updatedPublication = await comment.save();
  
      res.status(200).json(updatedPublication); // Renvoyez la publication mise à jour
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la modification de la publication : " + error.message });
    }
  }
module.exports = {  add,getAlls,remove,getbyid,update };
