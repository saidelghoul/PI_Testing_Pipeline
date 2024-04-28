const Document = require("../model/document");

async function getDocuments(req, res) {
  Document.find({})
    .exec()
    .then((document) => {
      res.status(200).json({ title: "success", message: document });
    })
    .catch((error) => {
      res.status(500).json({ title: "Server error: ", message: error.message });
    });
}

async function getDocumentById(req, res) {
  Document.findById(req.params.id_document)
    .exec()
    .then((document) => {
      if (!document)
        res
          .status(404)
          .json({ title: "error", message: "Couldn't find Document" });
      else res.status(200).json({ title: "success", message: document });
    })
    .catch((error) => {
      res.status(500).json({ title: "Server error: ", message: error.message });
    });
}

async function uploadDocumentToChecklist(req, res) {
  try {
    const document = new Document({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      buffer: req.file.buffer,
      id_checklist: req.params.id_checklist,
    });

    const doc = await document.save();

    if (!doc)
      res
        .status(500)
        .json({ title: "error", message: "error saving document" });
    else {
      res
        .status(201)
        .json({ title: "success", message: "document uploaded successfully" });
    }
  } catch (err) {
    res.status(500).json({ title: "Server error", message: err.message });
  }
}

async function removeDocument(req, res) {
  try {
    const document = await Document.findByIdAndDelete(req.params.id_document);
    if (!document)
      res
        .status(404)
        .json({ title: "error", message: "Couldn't find Document" });
    else
      res
        .status(204)
        .json({ title: "deleted", message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ title: "Server error", message: err.message });
  }
}

async function getDocumentByChecklist(req, res, next) {
  try {
    const document = await Document.findOne({
      id_checklist: req.params.id_checklist,
    });
    if (!document)
      res
        .status(404)
        .json({ title: "error", message: "Couldn't find Document" });
    else res.status(200).json({ title: "success", message: document });
  } catch (err) {
    res.status(500).json({ title: "error", message: err.message });
  }
}

module.exports = {
  getDocuments,
  getDocumentById,
  uploadDocumentToChecklist,
  removeDocument,
  getDocumentByChecklist,
};
