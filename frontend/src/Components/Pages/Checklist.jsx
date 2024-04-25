import { useContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { updateChecklist } from "../../services/checklist-service";
import ChecklistDelete from "../Modals/ChecklistDelete";
import PropTypes from "prop-types";
import { UserContext } from "../../../context/userContext";
import toast from "react-hot-toast";

const Checklist = ({ refresh, checkList, task, index, upChecklist }) => {
  const { user } = useContext(UserContext);
  const [toggle, setToggle] = useState(checkList.done);

  const updateDone = async (e) => {
    checkList.done = e.target.checked;
    if (checkList?.done) checkList.doneDate = new Date();
    else {
      checkList.doneDate = null;
      checkList.score = 0;
      checkList.rating = 0;
      setRating(0);
    }

    const response = await updateChecklist(checkList._id, checkList);
    if (response.status === 200) {
      setToggle(!toggle);
      refresh();
    }
  };

  /* pop up*/
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => setShowDelete(true);

  const handleCloseDelete = () => setShowDelete(false);
  const [rating, setRating] = useState(checkList?.rating);
  const [hover, setHover] = useState(null);
  const [totalStars] = useState(10);

  /* pop up end*/

  const setScore = async (currentRating) => {
    setRating(currentRating);
    // formula logic
    let taskScore = 0;
    // task score is set according to priority
    switch (task?.priority) {
      case "medium":
        taskScore = 50;
        break;
      case "high":
        taskScore = 100;
        break;
      default:
        taskScore = 20;
        break;
    }
    let doneScore = 0;
    //checklist done score is set according to wether it was done before task end date or after
    if (checkList?.doneDate !== null) {
      let days = Math.round(
        (new Date(checkList?.doneDate).getTime() -
          new Date(task?.dueDate).getTime()) /
          (1000 * 3600 * 24)
      );
      if (days <= 0) doneScore = 10;
      else if (days > 0 && days <= 10) doneScore = 1 - days / 10;
      else doneScore = 0;
    } else {
      checkList.score = 0;
    }

    let rating = currentRating - 1;

    checkList.rating = rating;
    //final score to current checklist
    checkList.score = Math.round((doneScore * taskScore * rating) / 10);
    //
    const response = await updateChecklist(checkList._id, checkList);
    if (response.status === 200) {
      toast.success("Rating assigned successfully");
      refresh();
    }
  };
  return (
    <>
      <Card
        bg={checkList.done ? "success" : "secondary"}
        style={{ width: "21rem" }}
        className=" shadow shadow-sm m-3 "
      >
        <Card.Header>
          <Row bg={checkList.done ? "success" : "secondary"}>
            <Col md="8">Todo N°{index} 🏷️</Col>
            <Col md="2">
              <label className="custom-control custom-checkbox">
                <input
                  label="Done?"
                  checked={checkList.done}
                  type="checkbox"
                  className="custom-control-input"
                  onChange={(e) => updateDone(e)}
                />
                <span className="custom-control-label"></span>
              </label>
            </Col>
            <Col md="2">
              <Button
                className="btn btn-outline-light"
                style={{ backgroundColor: "#e44d3a" }}
                onClick={handleShowDelete}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
              </Button>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Card.Title className=" text-white ">{checkList.title}</Card.Title>
          <Card.Text className=" text-white ">
            -Assigned to:{checkList?.holder?.name} ( {checkList?.holder?.role} )
            <br />
            {checkList?.description !== "" && (
              <>-Description: {checkList?.description}</>
            )}
          </Card.Text>
          {toggle && user?.id !== checkList?.holder?._id ? (
            <div>
              {[...Array(totalStars)].map((star, index) => {
                const currentRating = index + 1;

                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onChange={() => setScore(currentRating)}
                    />
                    <span
                      className="star"
                      style={{
                        color:
                          currentRating <= (hover || rating)
                            ? "#ffc107"
                            : "#e4e5e9",
                      }}
                      onMouseEnter={() => setHover(currentRating)}
                      onMouseLeave={() => setHover(null)}
                    >
                      &#9733;
                    </span>
                  </label>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </Card.Body>
      </Card>

      <ChecklistDelete
        refresh={refresh}
        upChecklist={upChecklist}
        show={showDelete}
        handleClose={handleCloseDelete}
        checklist={checkList}
        deleting={true}
      />
    </>
  );
};

Checklist.propTypes = {
  refresh: PropTypes.func,
  checkList: PropTypes.object,
  task: PropTypes.object,
  index: PropTypes.number,
  upChecklist: PropTypes.func,
};

export default Checklist;
