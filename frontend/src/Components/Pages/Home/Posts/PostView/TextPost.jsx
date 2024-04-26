export default function TextPost({ postContent }) {

  return (
    <div className="job_descp">
      <h3>{postContent.Sujet}</h3> <p>{postContent.Contenue}</p>
    </div>
  );
}
