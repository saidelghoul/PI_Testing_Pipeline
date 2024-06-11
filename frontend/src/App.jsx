import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Profil from "./Components/Pages/Profils";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import SignIn from "./Components/SignIn";
import AccountSetting from "./Components/Pages/AccountSetting";
import Activites from "./Components/Pages/Activites";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import ActivityDetails from "./Components/Pages/ActivityDetails";
import TaskDetails from "./Components/Pages/TaskDetails";
import AccountUpdate from "./Components/Pages/AccountUpdate";
import Section from "./Components/Pages/Section";
import AffectSkill from "./Components/Modals/Skills/AffectSkill";
import AffectSkillOtherUser from "./Components/Modals/Skills/AffectSkillOtherUser";
import SocialSkills from "./Components/Pages/Skills/SocialSkills/SocialSkills";

import AddSocialSkill from "./Components/Pages/Skills/SocialSkills/AddSocialSkill";
import EditSocialSkill from "./Components/Pages/Skills/SocialSkills/EditSocialSkill";
import DeleteSocialSkill from "./Components/Pages/Skills/SocialSkills/DeleteSocialSkill";

import TechnicalSkills from "./Components/Pages/Skills/TechnicalSkills/TechnicalSkills";
import AddTechnicalSkill from "./Components/Pages/Skills/TechnicalSkills/AddTechnicalSkill";
import EditTechnicalSkill from "./Components/Pages/Skills/TechnicalSkills/EditTechnicalSkill";
import DeleteTechnicalSkill from "./Components/Pages/Skills/TechnicalSkills/DeleteTechnicalSkill";
import TechnicalSkillAffect from "./Components/Modals/Skills/technical/TechnicalSkillAffect";

import AddGroup from "./Components/Pages/groups/AddGroups";
import AllGroups from "./Components/Pages/groups/AllGroups";
import Groups from "./Components/Pages/groups/Groups";

import Messages from "./Components/Pages/chats/Messages";
import UpdateGroups from "./Components/Pages/groups/UpdateGroups";
import ListNotification from "./Components/Pages/groups/ListNotification";
import AddConversation from "./Components/Pages/chats/AddConversation";
import UpdateConversation from "./Components/Pages/chats/UpdateConversation";
import AddUsers from "./Components/Pages/chats/AddUsers";
import AddPub from "./Components/Pages/Home/Posts/Add/AddPub";
import Home from "./Components/Pages/Home/Home";

import AddEvent from "./Components/Pages/Home/Posts/Add/AddEvent";
import Update from "./Components/Pages/Home/Posts/Update/Update";
import UpdateEvent from "./Components/Pages/Home/Posts/Update/UpdateEvent";
import Leaderboard from "./Components/Pages/Skills/Leaderboard";
import Historiques from "./Components/Historiques";
import UpdateProfil from "./Components/Pages/UpdateProfil";
import ResetPassword from "./Components/Pages/ResetPassword";
import NewPassword from "./Components/Pages/NewPassword";
import ConfirmEmail from "./Components/Pages/ConfirmEmail";
import AddFriends from "./Components/Pages/Friends/AddFriends";
import ProfileFriend from "./Components/Pages/Friends/ProfileFriend";
import SuccessPage from "./Components/Pages/Friends/SucessPage";
import Disscussions from "./Components/Pages/chats/Disscussions";
import MyGroups from "./Components/Pages/groups/MyGroups";
import AddPubGroups from "./Components/Pages/groups/AddPubGroups";
import UpdatePubGroups from "./Components/Pages/groups/UpdatePubGroups";
import PubGroups from "./Components/Pages/groups/PubGroups";
import PubActions from "./Components/Pages/groups/PubActions";
import AddCommentPub from "./Components/Pages/groups/AddCommentPub";
import Teste from "./Components/Pages/chats/Teste";
import Technologies from "./Components/Pages/Skills/Technology/Technologies";
import AddTechnology from "./Components/Pages/Skills/Technology/AddTechnology";
import EditTechnology from "./Components/Pages/Skills/Technology/EditTechnology";
import DeleteTechnology from "./Components/Pages/Skills/Technology/DeleteTechnology";

import PrivateRoute from "./Components/PrivateRoute";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

function App() {
  const NewPasswordWrapper = ({ location, history, match }) => {
    return <NewPassword match={match} />;
  };

  const Confirmation = ({ location, history, match }) => {
    return <ConfirmEmail match={match} />;
  };
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/modifier/:postId"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <UpdatePubGroups />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/teste"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Teste />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/afficherPub/:groupId"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <PubGroups />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/actions/:postId"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <PubActions />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/addcomments/:postId"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddCommentPub />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/message"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Disscussions />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/addPub/:groupId"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddPubGroups />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/groupes"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AllGroups />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/myGroups"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <MyGroups />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <PrivateRoute>
                <Navbar />
                <PrivateRoute>
                  <Groups />
                </PrivateRoute>

                <Footer />
              </PrivateRoute>
            }
          />
          <Route
            path="/addGroup"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddGroup />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/modifierPage/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <UpdateGroups />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/notifications/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <ListNotification />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/addConversation"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddConversation />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/Historiques/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Historiques />
                </PrivateRoute>
              </>
            }
          />
          <Route
            path="/modifierConversation/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <UpdateConversation />
                </PrivateRoute>

                <Footer />
              </>
            }
          />

          <Route
            path="/getUsers/:conversationId"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddUsers />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/addPub"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddPub />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/addEvent"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddEvent />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/update/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Update />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/updateEvent/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <UpdateEvent />
                </PrivateRoute>

                <Footer />
              </>
            }
          />

          <Route path="/" element={<SignIn />} />
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Home />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/groupes"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Groups />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/message"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Messages />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/profil"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Profil />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AccountSetting />
                </PrivateRoute>

                <Footer />
              </>
            }
          />
          <Route path="/activities">
            <Route
              index
              element={
                <>
                  <Navbar />
                  <PrivateRoute>
                    <Activites />
                  </PrivateRoute>
                </>
              }
            />

            <Route
              path=":id_activity"
              element={
                <>
                  <Navbar />
                  <PrivateRoute>
                    <ActivityDetails />
                  </PrivateRoute>
                </>
              }
            />
          </Route>
          <Route
            path="tasks/:id_task"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <TaskDetails />
                </PrivateRoute>
              </>
            }
          />

          <Route
            path="tasks/:id_task"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <TaskDetails />
                </PrivateRoute>
              </>
            }
          />

          <Route
            path=":id_user/tasks"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Section />
                </PrivateRoute>
              </>
            }
          />

          <Route
            path="/completerProfil"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AccountUpdate />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/friends"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddFriends />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/success"
            element={
              <>
                <SuccessPage />
              </>
            }
          />

          <Route
            path="/profileuser/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <ProfileFriend />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/updateProfil"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <UpdateProfil />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/forgotPassword"
            element={
              <>
                <ResetPassword />
              </>
            }
          />

          <Route path="/reset/:token" element={<NewPasswordWrapper />} />
          <Route path="/confirm/:token" element={<Confirmation />} />

          <Route
            path="/affectSkill/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AffectSkill />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/Leaderboard/"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <Leaderboard />
                </PrivateRoute>
              </>
            }
          />

          <Route
            path="/socialSkills/"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <SocialSkills />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/socialSkills/add"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AddSocialSkill />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/socialSkills/edit/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <EditSocialSkill />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/socialSkills/delete/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <DeleteSocialSkill />
                </PrivateRoute>
                <Footer />
              </>
            }
          />

          <Route
            path="/technicalSkills/"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <TechnicalSkills />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/technicalSkills/add"
            element={
              <>
                <Navbar />
                <AddTechnicalSkill />
                <Footer />
              </>
            }
          />
          <Route
            path="/technicalSkills/edit/:id"
            element={
              <>
                <Navbar />
                <EditTechnicalSkill />
                <Footer />
              </>
            }
          />

          <Route
            path="/technicalSkills/delete/:id"
            element={
              <>
                <Navbar />
                <DeleteTechnicalSkill />
                <Footer />
              </>
            }
          />

          <Route
            path="/:id/assign"
            element={
              <>
                <Navbar />
                <TechnicalSkillAffect />
                <Footer />
              </>
            }
          />

          <Route
            path="/technologies/"
            element={
              <>
                <Navbar />
                <Technologies />
                <Footer />
              </>
            }
          />

          <Route
            path="/technologies/add"
            element={
              <>
                <Navbar />
                <AddTechnology />
                <Footer />
              </>
            }
          />

          <Route
            path="/technologies/edit/:id"
            element={
              <>
                <Navbar />
                <EditTechnology />
                <Footer />
              </>
            }
          />
          <Route
            path="/technologies/delete/:id"
            element={
              <>
                <Navbar />
                <DeleteTechnology />
                <Footer />
              </>
            }
          />

          <Route
            path="/affectSkillOtherUser/:id"
            element={
              <>
                <Navbar />
                <PrivateRoute>
                  <AffectSkillOtherUser />
                </PrivateRoute>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
