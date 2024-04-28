const multer = require("multer");
const express = require("express");
const router = express.Router();
const upload = multer({ dest: "docs/" });
const documentController = require("../controller/documentController");

router.get("/", documentController.getDocuments);

router.get("/:id_document", documentController.getDocumentById);

router.get(
  "/:id_checklist/document",
  documentController.getDocumentByChecklist
);

router.post(
  "/upload/:id_checklist",
  upload.single("doc"),
  documentController.uploadDocumentToChecklist
);

router.delete("/:id_document", documentController.removeDocument);

module.exports = router;
