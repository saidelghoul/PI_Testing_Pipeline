const Groups = require("../../model/Chats/groups");
const pubGroups = require("../../model/Groups/pubGroups");
const User = require("../../model/user");

async function add(req, res) {
    const { contenu, creator: userId, groupsId: groupId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const group = await Groups.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }

        const newPublication = new pubGroups({
            Contenue: contenu,
            creator: userId,
            groupsId: groupId,
        });
        const savedPublication = await newPublication.save();

        // Ajouter l'ID de la nouvelle publication à la liste des publications du groupe
        group.publications.push(savedPublication._id);
        await group.save();

        res.status(201).json(savedPublication);
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
}
async function getPublicationsByGroupId(req, res) {
  const groupId = req.params.groupId;

  try {
    // Recherche du groupe par son ID
    const group = await Groups.findById(groupId);
    if (!group) {
      throw new Error('Le groupe n\'existe pas');
    }

    // Utilisation de populate pour remplacer les ID des publications par les documents de publication complets
    const pubs = await pubGroups.find({ groupsId: groupId }).populate({
      path: "creator",
      select: "name profileImage" // Sélectionnez les propriétés que vous voulez récupérer du créateur
    }).exec();

    res.json(pubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


  async  function getAlls(req, res) {
    try {
      const groupId = req.params.groupId;
      const posts = await pubGroups.find({ groupsId: groupId }).populate({path:"creator comments ",select:"name profileImage"});
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  async function remove(req, res) {
    const id = req.params.id;
    try {
      const Pubpage = await pubGroups.findByIdAndDelete(id);
      if (!Pubpage) res.status(404).json({ error: "Couldn't find Pub" });
      else res.status(204).json({ info: "Deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error" + err.message });
    }
  }
  async function updatePublication(req, res) {
    const { contenu } = req.body;
    const postId = req.params.postId;
  
    try {
      // Vérifiez d'abord si la publication existe
      const publication = await pubGroups.findById(postId);
      if (!publication) {
        return res.status(404).json({ message: "La publication n'existe pas" });
      }
  
      // Mettez à jour les champs de la publication
      publication.Contenue = contenu; // Modifiez le champ selon votre modèle de données
  
      // Enregistrez la publication mise à jour dans la base de données
      const updatedPublication = await publication.save();
  
      res.status(200).json(updatedPublication); // Renvoyez la publication mise à jour
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la modification de la publication : " + error.message });
    }
  }
  async function reactToPublication(req, res) {
    const postId = req.params.postId;
    const userId = req.params.userId; // Supposons que vous avez un middleware d'authentification qui stocke l'ID de l'utilisateur dans req.user

    try {
      let post = await pubGroups.findById(postId);

      if (!post) {
        return res.status(404).json({ error: "Couldn't find post" });
      }   
      
      let user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "Couldn't find user" });
      }   
      if(post.LikedBy.includes(userId)){
        return res.status(200).json({message:"POst alredy liked"});
      }
      if(post.Dislikedby.includes(userId)){
        post.Dislikedby.pull(userId) ;
        post.dislike-=1;
      }
      post.LikedBy.push(userId);
      post.Like+=1;

      const savedLikes= await post.save();
      res.status(200).json(savedLikes);

    } catch (error) {
        console.error('Error getting user reaction:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

async function dislikeToPublication(req, res) {
  const postId = req.params.postId;
  const userId = req.params.userId; // Supposons que vous avez un middleware d'authentification qui stocke l'ID de l'utilisateur dans req.user

  try {
    let post = await pubGroups.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Couldn't find post" });
    }   
    
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "Couldn't find user" });
    }   
    if(post.Dislikedby.includes(userId)){
      return res.status(200).json({message:"POst alredy disliked"});
    }
    if(post.LikedBy.includes(userId)){
      post.LikedBy.pull(userId) ;
      post.Like-=1;
    }
    post.Dislikedby.push(userId);
    post.dislike+=1;

    const savedDisLikes= await post.save();
    res.status(200).json(savedDisLikes);

  } catch (error) {
      console.error('Error getting user reaction:', error);
      res.status(500).json({ message: 'Server error' });
  }
}

async function getLikesAndDislikesForPublication(req, res) {
  const postId = req.params.postId;

  try {
    let post = await pubGroups.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Couldn't find post" });
    }

    const likes = post.Like;
    const dislikes = post.dislike;

    res.status(200).json({ likes, dislikes });

  } catch (error) {
    console.error('Error getting likes and dislikes:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

  
  async function getbyid(req, res) {
    try {
      const postId = req.params.id;
      const pub = await pubGroups.findById(postId);
      if (!pub) {
          return res.status(404).json({ message: 'Le pub n\'existe pas' });
      }
      res.status(200).json(pub);
  } catch (error) {
      console.error('Erreur lors de la récupération du pub par ID :', error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du groupe' });
  }
  }

  async function getPublicationsByGroupAndUser(req, res) {
    const userId = req.params.userId;
  
    try {
      // Rechercher les publications créées par un utilisateur spécifique dans un groupe donné
      const publications = await pubGroups.find({ creator: userId }).populate({
        path: "creator",
        select: "name profileImage", // Sélectionnez les propriétés que vous voulez afficher du créateur
      });
  
      if (publications.length === 0) {
        return res.status(200).json({ publications});
      }
  
      res.status(200).json(publications);
    } catch (error) {
      console.error("Erreur lors de la récupération des publications :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  }

  module.exports = {  add ,getAlls,reactToPublication,getLikesAndDislikesForPublication,dislikeToPublication ,updatePublication,getPublicationsByGroupId,remove, getbyid,getPublicationsByGroupAndUser};
