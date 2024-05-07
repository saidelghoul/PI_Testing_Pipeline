import React, { useState, useEffect, useContext } from "react";
import moment from "moment/moment";
import { UserContext } from "../../../../../../context/userContext";
import axios from "axios";
import { booked } from "../../utils/const";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { validDate } from "../../utils/utils";
export default function EventPost({ postContent }) {
  const { user } = useContext(UserContext);

  const [countdown, setCountdown] = useState("");

  const nbPlacesLeft = postContent.Capacite - postContent.reservations.length;

  const reservationMade = postContent.reservations
    ? postContent.reservations.indexOf(user?.id)
    : -1;

  useEffect(() => {
    const interval = setInterval(() => {
      const startDate = new Date(postContent.DateDebut);
      const currentDate = new Date();
      const timeDifference = startDate - currentDate;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        let countdown = "";

        if (days > 0) {
          countdown += `${days}d `;
        }
        if (hours > 0) {
          countdown += `${hours}h `;
        }
        if (minutes > 0) {
          countdown += `${minutes}m `;
        }
        countdown += `${seconds}s`;

        setCountdown(countdown.trim());
      } else {
        setCountdown("Expired");
        clearInterval(interval); // Stop the interval
      }
    }, 1000); // Update countdown every second
    return () => clearInterval(interval); // Cleanup on unmount
  }, [postContent.DateDebut]);

  const handleReservationClick = async () => {
    try {
      const ReservationData = {
        userId: user.id,
      };

      await axios.post(
        `evenemnt/reservation/${postContent._id}`,
        ReservationData
      );

      alert("Reservation created");
    } catch (error) {
      console.error("Error setting up the request:", error.message);
      alert("Error setting up the request: " + error.message);
    }
  };
  const testDate = validDate(postContent.DateDebut, 4);
  return (
    <>
      {postContent.ImagePath && (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/images/${postContent.ImagePath}`}
          alt="Event"
          style={{ width: "500px", height: "250px" }}
        />
      )}{" "}
      <Card.Body>
        <Card.Title>{postContent.Titre}</Card.Title>
        <Card.Text>{postContent.Contenu}</Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              Price:{" "}
              <span>
                {postContent.Prix === null
                  ? "Free"
                  : postContent.Prix === 0
                  ? "Free"
                  : postContent.Prix + " dt"}
              </span>
            </div>
            <div>
              <a href="#" title="">
                Capacite: {postContent.Capacite}
              </a>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {" "}
            <div>
              <h3>
                <img src="/assets/images/clock.png" alt="" />
                Start: {moment(postContent.DateDebut).format("lll")}
              </h3>
            </div>
            <div>
              <h3>
                <img src="/assets/images/clock.png" alt="" />
                Finish: {moment(postContent.DateFin).format("lll")}
              </h3>
            </div>{" "}
          </div>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        {countdown !== "" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3 style={{ marginRight: "20px" }}>{nbPlacesLeft} places left</h3>
            {testDate && (
              <>
                {reservationMade ? (
                  <Button
                    onClick={() => handleReservationClick(postContent._id)}
                    variant={booked.YES}
                  >
                    Book
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleReservationClick(postContent._id)}
                    variant={booked.NO}
                  >
                    Cancel
                  </Button>
                )}
              </>
            )}
            <h3 style={{ color: countdown === "Expired" ? "red" : "inherit" }}>
              {countdown === "Expired" ? (
                <span>{countdown}</span>
              ) : (
                <span>Before: {countdown}</span>
              )}
            </h3>
          </div>
        )}
      </Card.Body>
    </>
  );
}
