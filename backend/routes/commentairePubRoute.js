var express = require("express");
var router = express.Router();
var commentpageController = require("../controller/Groups/CommentGroupsController");


router.post("/addComment/:postId", commentpageController.add);
router.get('/comments/:postId', commentpageController.getAlls);
router.delete("/remove/:commentId", commentpageController.remove);
router.get('/getById/:commentId', commentpageController.getbyid);
router.put('/update/:postId', commentpageController.update);


module.exports = router;
