import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { UserContext } from "../../../../context/userContext";
import Feed from "./Feed/Feed.jsx";

export default function Home() {
  const { user } = useContext(UserContext);
  const [totalReports, setTotalReports] = useState(0);
  console.log("totalReports : ", totalReports);

  // use this block of code where you want to get user score
  useEffect(() => {
    console.log("user", user);
    if (user?.id !== null && user?.id !== undefined) fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    // initialiser user par l'id de user que je vais voir son score
    try {
      const totalReportsRes = await axios.get(
        `/userScore/publicationsCountByUserId/${user?.id}`
      );
      console.log("totalReportsRes", totalReportsRes);

      setTotalReports(totalReportsRes.data);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

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
                          {/* <img src={imageUrl} alt="Image de profil" /> */}
                        </div>
                      </div>
                      <div className="user-specs">
                        <> {!!user && <h1>{user.name}</h1>}</>
                        <span> {!!user && <h2>{user.role}</h2>}</span>
                        <span>
                          Département {!!user && <h2>{user.departement}</h2>}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Feed />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
