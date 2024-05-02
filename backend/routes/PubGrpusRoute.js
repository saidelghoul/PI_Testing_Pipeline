var express = require("express");
var router = express.Router();
var PubpageController = require("../controller/Groups/PubGroupsController");



router.post("/addPub/:id", PubpageController.add);
router.get('/groups/:id/posts', PubpageController.getAlls);
router.delete("/remove/:id", PubpageController.remove);
router.get('/getById/:id/', PubpageController.getbyid);
router.get('/getPubId/:groupId', PubpageController.getPublicationsByGroupId);
router.put('/update/:postId', PubpageController.updatePublication);
router.post('/publications/:postId/:userId', PubpageController.reactToPublication);
router.post('/publications/:postId/:userId/dislike', PubpageController.dislikeToPublication);
router.get('/publications/:postId/reactions', PubpageController.getLikesAndDislikesForPublication);



module.exports = router;
