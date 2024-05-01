import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DropFileInput from "../../Hooks/DropFileInput";
import {
  uploadDocumentToChecklist,
  deleteDocument,
  getDocumentByChecklist,
} from "../../services/document-service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import "../../assets/drop-file-input.css";
import { ImageConfig } from "../../assets/ImageConfig.js";

const DepositFile = ({ show, handleClose, checkList, refresh }) => {
  const [fileItem, setFileItem] = useState(null);

  //const [showUpload, setShowUpload] = useState(true);
  const [file, setFile] = useState({});

  const onFileChange = (files) => {
    setFileItem(files);
    //setShowUpload(files !== null);
  };

  const fetchFile = async () => {
    try {
      const result = await getDocumentByChecklist(checkList?._id);
      setFile(result.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (show && checkList?.hasFile) fetchFile();
  }, [show]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleUploadDocument();
  };

  const handleDeleteFile = async () => {
    try {
      const result = await deleteDocument(file?._id);
      if (result.status === 204) {
        toast.success("Deleted successfully");
        refresh();
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUploadDocument = async () => {
    try {
      const formData = new FormData();
      formData.append("filename", fileItem);
      const result = await uploadDocumentToChecklist(checkList?._id, formData);
      if (result.status === 200) {
        toast.success("Uploaded successfully");
        refresh();
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Row>
          <Modal.Title as={Col}>
            <h1 className=" text-white h3 ">Attach new work</h1>
          </Modal.Title>
          <Button
            as={Col}
            md="3"
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "#fff",
              color: "#e44d3a",
              cursor: "pointer",
            }}
          >
            Close
          </Button>
        </Row>
      </Modal.Header>

      <Modal.Body>
        <div className="box">
          {checkList?.hasFile ? (
            <div>
              <p className="h4 text-danger ">
                This checklist already has a file attached to it, do you want to
                delete it?
              </p>
              {show && (
                <div className="drop-file-preview">
                  <p className="drop-file-preview__title">
                    File uploaded by you
                  </p>
                  <div className="drop-file-preview__item">
                    <img
                      src={
                        ImageConfig[file?.contentType?.split("/")[1]] ||
                        ImageConfig["default"]
                      }
                      alt=""
                    />
                    <div className="drop-file-preview__item__info">
                      <p>{file?.fileName}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <DropFileInput onFileChange={(files) => onFileChange(files)} />
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {checkList?.hasFile ? (
          <Button
            style={{ backgroundColor: "#e44d3a" }}
            onClick={handleDeleteFile}
          >
            Delete file
          </Button>
        ) : (
          <Button style={{ backgroundColor: "#e44d3a" }} onClick={handleSubmit}>
            Upload
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

DepositFile.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  checkList: PropTypes.object,
  refresh: PropTypes.func,
};

export default DepositFile;
