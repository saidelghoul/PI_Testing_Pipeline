import React, { useState, useEffect } from "react";
import moment from "moment/moment";

export default function EventPost({ postContent }) {
  const [countdown, setCountdown] = useState("");

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

  return (
    <div className="job-status-bar">
      <div className="epi-sec">
        <ul className="descp"></ul>
      </div>
      <div className="job_descp">
        <ul className="job-dt">
          <li>
            <a href="#" title="">
              Capacite: {postContent.Capacite}
            </a>
          </li>
          <li>
            Price:
            <span>
              {postContent.Prix === null
                ? "Free"
                : postContent.Prix === 0
                ? "Free"
                : postContent.Prix + " dt"}
            </span>
          </li>
        </ul>
        <span>
          <h3>
            <img src="/assets/images/clock.png" alt="" />
            Start: {moment(postContent.DateDebut).format("lll")}
          </h3>
          <h3>
            <img src="/assets/images/clock.png" alt="" />
            Finish: {moment(postContent.DateFin).format("lll")}
          </h3>

          <h3 style={{ color: countdown === "Expired" ? "red" : "inherit" }}>
            {countdown === "Expired" ? (
              <span>{countdown}</span>
            ) : (
              <span>Countdown: {countdown}</span>
            )}
          </h3>
        </span>
        <h3>{postContent.Titre}</h3> <p>{postContent.Contenu}</p>
      </div>
    </div>
  );
}
