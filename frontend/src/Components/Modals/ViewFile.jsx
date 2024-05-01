import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { Button, Modal, Row, Col, Spinner } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getDocumentByChecklist } from "../../services/document-service";
import Feedback from "../Pages/Feedback";

const ViewFile = ({ show, handleClose, checkList }) => {
  const [files, setFiles] = useState([
    {
      uri: "",
      fileType: "",
      fileName: "",
    },
  ]);

  const [loading, setLoading] = useState(true);

  const fetchFile = async () => {
    const result = await getDocumentByChecklist(checkList?._id);
    const file = {
      uri: result.data.message.fileUrl,
      fileType: result.data.message.contentType,
      fileName: result.data.message.fileName,
    };
    setFiles(file);
    setLoading(false);
  };
  useEffect(() => {
    if (show) {
      fetchFile();
    }
  }, [show]);

  let docs = [
    {
      uri: files?.uri,
      fileType: files?.fileType,
      fileName: files?.fileName,
    },
  ];

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
            <h1 className=" text-white h3 ">View attached work</h1>
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
        <div className="App">
          {loading ? (
            <div className=" text-center ">
              <Spinner
                animation="border"
                role="output"
                variant="danger"
              ></Spinner>
            </div>
          ) : (
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={docs}
              prefetchMethod="GET"
              config={{
                header: {
                  disableHeader: false,
                  disableFileName: false,
                  retainURLParams: true,
                },
              }}
              style={{ height: 500 }}
            />
          )}
          <hr />
          <Feedback handleClose={handleClose} checkList={checkList} />
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

ViewFile.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  checkList: PropTypes.object,
};

export default ViewFile;
