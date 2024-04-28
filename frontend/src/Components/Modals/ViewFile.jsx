import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { Button, Modal, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const ViewFile = ({ show, handleClose }) => {
  const docs = [
    {
      uri: "assets/images/resources/about.png",
    },
    {
      uri: "https://api.core.sowat.dev/v2/assets?url=https://s3.ap-southeast-1.amazonaws.com/internal.gredu.co/dev/lesson_attachments/%282%29%20Aljabar%20Fisika-2-1637294567.pdf",
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
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
            config={{
              header: {
                disableHeader: false,
                disableFileName: false,
                retainURLParams: false,
              },
            }}
            style={{ height: 500 }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

ViewFile.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default ViewFile;
