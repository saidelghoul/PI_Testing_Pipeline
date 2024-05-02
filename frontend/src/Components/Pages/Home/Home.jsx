import { useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import Feed from "./Feed/Feed.jsx";

export default function Home() {
  const { user } = useContext(UserContext);
  const userId = user ? user.id : null;
  const imageUrl = user && user.profileImage 
  ? `http://localhost:8000/user/${userId}/profile` 
  : "/assets/images/resources/user-pro-img.png";
  
  return (
    <main>
      <div className="main-section">
        <div className="container">
          <div className="main-section-data">
            <div className="row">
              <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                <div className="main-left-sidebar no-margin">
                  <div className="user-data full-width">
                    <div className="user-profile">
                      <div className="username-dt">
                        <div className="usr-pic">
                        <img src={imageUrl} alt="Image de profil" />

                        </div>
                      </div>
                      <div className="user-specs">
                        <> {!!user && <h1>{user.name}</h1>}</>
                        <span> {!!user && <h2>{user.role}</h2>}</span>
                        <span>
                        Department  {!!user && <h2>{user.departement}</h2>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Feed */}
              <Feed />
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
