const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../config/firebase.config");
const Document = require("../model/document");
const CheckList = require("../model/checklist");

initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

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
    else {
      const checkList = await CheckList.findById(document.id_checklist);
      checkList.hasFile = false;
      checkList.done = false;
      checkList.doneDate = null;
      checkList.score = 0;
      checkList.rating = 0;

      await CheckList.findByIdAndUpdate(document.id_checklist, checkList, {
        next: true,
      });
      res
        .status(204)
        .json({ title: "deleted", message: "Deleted successfully" });
    }
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

async function uploadToFirebase(req, res) {
  try {
    const checkList = await CheckList.findById(req.params.id_checklist);

    if (!checkList)
      return res.status(404).send({
        title: "error",
        message: "CheckList not found",
      });
    else {
      const dateTime = giveCurrentDateTime();

      const storageRef = ref(
        storage,
        `files/${req.file.originalname + "       " + dateTime}`
      );

      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };

      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);

      checkList.hasFile = true;
      await CheckList.findByIdAndUpdate(req.params.id_checklist, checkList, {
        next: true,
      });
      //save the uploaded file to the database
      const document = new Document({
        fileName: req.file.originalname,
        contentType: req.file.mimetype,
        fileUrl: downloadURL,
        id_checklist: req.params.id_checklist,
      });

      const doc = await document.save();

      if (!doc)
        return res.status(500).send({
          title: "error",
          message: "file not saved in database",
        });
      else
        return res.status(200).send({
          title: "file uploaded to firebase storage",
          message: downloadURL,
        });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = {
  getDocuments,
  getDocumentById,
  uploadDocumentToChecklist,
  removeDocument,
  getDocumentByChecklist,
  uploadToFirebase,
};
