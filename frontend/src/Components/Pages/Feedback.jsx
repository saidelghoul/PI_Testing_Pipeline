import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updateChecklist } from "../../services/checklist-service";
import toast from "react-hot-toast";
import { UserContext } from "../../../context/userContext";

const Feedback = ({ handleClose, checkList }) => {
  const { user } = useContext(UserContext);
  const [rating, setRating] = useState(0);
  const [totalStars] = useState(10);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    setRating(checkList?.rating + 1);
    setFeedback(checkList?.feedback);
  }, [checkList?.feedback, checkList?.rating]);

  const onValueChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleUpdateChecklist();
  };

  const handleUpdateChecklist = async () => {
    try {
      checkList.feedback = feedback;
      const result = await updateChecklist(checkList?._id, checkList);
      if (result.status === 200) {
        toast.success("Feedback sent successfully");
        handleClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className=" text-center ">
        {[...Array(totalStars)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <label key={index}>
              <span
                className="star"
                style={{
                  cursor: "default",
                  color: currentRating <= rating ? "#ffc107" : "#e4e5e9",
                }}
              >
                &#9733;
              </span>
            </label>
          );
        })}
      </div>
      {user?.role !== "Enseignant" &&
      user?.id !== checkList?.holder?._id &&
      checkList?.done &&
      checkList?.rating < 4 ? (
        <>
          <Form>
            <Form.Group
              className=" m-lg-3 "
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Feedback to {checkList?.holder?.name}</Form.Label>
              <Form.Control
                className=" mt-2 "
                placeholder="Write a brief feedback on this work..."
                as="textarea"
                rows={3}
                name="feedback"
                value={feedback}
                onChange={onValueChange}
              />
            </Form.Group>
          </Form>
          <div className=" text-center ">
            <Button
              style={{ backgroundColor: "#e44d3a" }}
              onClick={handleSubmit}
            >
              Send feedback
            </Button>
          </div>
        </>
      ) : (
        <div></div>
      )}

      {user?.id === checkList?.holder?._id &&
      checkList?.done &&
      checkList?.rating < 4 &&
      checkList?.feedback !== "" ? (
        <>
          <Form>
            <Form.Group
              className=" m-lg-3 "
              controlId="exampleForm.ControlTextarea2"
            >
              <Form.Label>Feedback on your uploaded work</Form.Label>
              <Form.Control
                className=" mt-2 "
                as="textarea"
                rows={3}
                readOnly="true"
                name="feedback"
                value={feedback}
                onChange={onValueChange}
              />
            </Form.Group>
          </Form>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

Feedback.propTypes = {
  handleClose: PropTypes.func,
  checkList: PropTypes.object,
};

export default Feedback;
