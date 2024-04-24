export default function EventPost({ postContent }) {
  return (
    <div className="job-status-bar">
      <div className="epi-sec">
        <ul className="descp"></ul>
      </div>
      <div className="job_descp">
        <ul className="job-dt">
          <li>
            <a href="#" title="">
              capacite :{postContent.Capacite}
            </a>
          </li>
          <li>
            prix:
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
          <img src="/assets/images/clock.png" alt="" />
          <h3>
            Date de début :{" "}
            {postContent.DateDebut
              ? new Date(postContent.DateDebut).toLocaleDateString("fr-FR")
              : "Date"}
          </h3>
          <img src="/assets/images/clock.png" alt="" />

          <h3>
            Date fin :{" "}
            {postContent.DateFin
              ? new Date(postContent.DateFin).toLocaleDateString("fr-FR")
              : "Date"}
          </h3>
        </span>
        <h3>{postContent.Titre}</h3> <p>{postContent.Contenu}</p>
      </div>
    </div>
  );
}
