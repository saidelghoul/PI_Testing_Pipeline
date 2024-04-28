import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import DropFileInput from "../../Hooks/DropFileInput";
import { uploadDocumentToChecklist } from "../../services/document-service";
import { useState } from "react";
import toast from "react-hot-toast";

const DepositFile = ({ show, handleClose, checkList }) => {
  const [fileItem, setFileItem] = useState(null);

  const [showUpload, setShowUpload] = useState(false);

  const onFileChange = (files) => {
    console.log(files);
    setFileItem(files);
    if (files !== null) {
      setShowUpload(true);
    } else setShowUpload(false);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleUploadDocument();
  };

  const handleUploadDocument = async () => {
    try {
      console.log(fileItem);
      const formData = new FormData();
      formData.append("doc", fileItem);
      const result = await uploadDocumentToChecklist(checkList?._id, formData);
      if (result.status === 201) {
        toast.success("Uploaded successfully");
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
          <DropFileInput onFileChange={(files) => onFileChange(files)} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!showUpload}
          style={{ backgroundColor: "#e44d3a" }}
          onClick={handleSubmit}
        >
          Upload
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DepositFile.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  checkList: PropTypes.object,
};

export default DepositFile;
