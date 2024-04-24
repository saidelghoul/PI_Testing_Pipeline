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
import SocialSkills from "./Components/Pages/Skills/SocialSkills/SocialSkills";
import TechnicalSkills from "./Components/Pages/Skills/TechnicalSkills/TechnicalSkills";
import AddSocialSkill from "./Components/Pages/Skills/SocialSkills/AddSocialSkill";
import EditSocialSkill from "./Components/Pages/Skills/SocialSkills/EditSocialSkill";
import DeleteSocialSkill from "./Components/Pages/Skills/SocialSkills/DeleteSocialSkill";

import AddGroup from "./Components/Pages/groups/AddGroups";
import AllGroups from "./Components/Pages/groups/AllGroups";
import Groups from "./Components/Pages/groups/Groups";

import Messages from "./Components/Pages/chats/Messages";
import UpdateGroups from "./Components/Pages/groups/UpdateGroups";
import ListNotification from "./Components/Pages/groups/ListNotification";
import AddConversation from "./Components/Pages/chats/AddConversation";
import UpdateConversation from "./Components/Pages/chats/UpdateConversation";
import AddUsers from "./Components/Pages/chats/AddUsers";
import AddPub from "./Components/Pages/Home/Pub/AddPub";
import Home from "./Components/Pages/Home/Home";
import AddEvent from "./Components/Pages/Home/Evenement/AddEvent";
import Update from "./Components/Pages/Home/Pub/Update";
import UpdateEvent from "./Components/Pages/Home/Evenement/UpdateEvent";
import UpdateProfil from "./Components/Pages/UpdateProfil";
import ResetPassword from "./Components/Pages/ResetPassword";
import NewPassword from './Components/Pages/NewPassword';
import ConfirmEmail from "./Components/Pages/ConfirmEmail";
import AddFriends from "./Components/Pages/Friends/AddFriends";
import ProfileFriend from "./Components/Pages/Friends/ProfileFriend";
import SuccessPage from './Components/Pages/Friends/SucessPage';

axios.defaults.baseURL = "http://localhost:8000";
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
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/groupes"
            element={
              <>
                <Navbar />
                <AllGroups />
                <Footer />
              </>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <>
                <Navbar />
                <Groups />
                <Footer />
              </>
            }
          />
          <Route
            path="/addGroup"
            element={
              <>
                <Navbar />
                <AddGroup />
                <Footer />
              </>
            }
          />
          <Route
            path="/modifier/:id"
            element={
              <>
                <Navbar />
                <UpdateGroups />
                <Footer />
              </>
            }
          />
          <Route
            path="/notifications/:id"
            element={
              <>
                <Navbar />
                <ListNotification />
                <Footer />
              </>
            }
          />
          <Route
            path="/addConversation"
            element={
              <>
                <Navbar />
                <AddConversation />
                <Footer />
              </>
            }
          />
          <Route
            path="/modifierConversation/:id"
            element={
              <>
                <Navbar />
                <UpdateConversation />
                <Footer />
              </>
            }
          />
          <Route
            path="/message"
            element={
              <>
                <Navbar />
                <Messages />
                <Footer />
              </>
            }
          />
          <Route
            path="/getUsers/:conversationId"
            element={
              <>
                <Navbar />
                <AddUsers />
                <Footer />
              </>
            }
          />
          <Route
            path="/addPub"
            element={
              <>
                <Navbar />
                <AddPub />
                <Footer />
              </>
            }
          />
          <Route
            path="/addEvent"
            element={
              <>
                <Navbar />
                <AddEvent />
                <Footer />
              </>
            }
          />
          <Route
            path="/update/:id"
            element={
              <>
                <Navbar />
                <Update />
                <Footer />
              </>
            }
          />
          <Route
            path="/updateEvent/:id"
            element={
              <>
                <Navbar />
                <UpdateEvent />
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
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/groupes"
            element={
              <>
                <Navbar />
                <Groups />
                <Footer />
              </>
            }
          />
          <Route
            path="/message"
            element={
              <>
                <Navbar />
                <Messages />
                <Footer />
              </>
            }
          />
          <Route
            path="/profil"
            element={
              <>
                <Navbar />
                <Profil />
                <Footer />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <Navbar />
                <AccountSetting />
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
                  <Activites />
                </>
              }
            />

            <Route
              path=":id_activity"
              element={
                <>
                  <Navbar />
                  <ActivityDetails />
                </>
              }
            />
          </Route>
          <Route
            path="tasks/:id_task"
            element={
              <>
                <Navbar />
                <TaskDetails />
              </>
            }
          />

          <Route
            path="tasks/:id_task"
            element={
              <>
                <Navbar />
                <TaskDetails />
              </>
            }
          />

          <Route
            path=":id_user/tasks"
            element={
              <>
                <Navbar />
                <Section />
              </>
            }
          />

          <Route
            path="/completerProfil"
            element={
              <>
                <Navbar />
                <AccountUpdate />
                <Footer />
              </>
            }
          />

<Route
            path="/friends"
            element={
              <>
                <Navbar />
                <AddFriends />
                <Footer />
              </>
            }
          />
              <Route path="/success" element={
                <>
                <SuccessPage />
                </>
              } />


<Route
            path="/profileuser/:id"
            element={
              <>
                <Navbar />
                <ProfileFriend />
                <Footer />
              </>
            }
          />
<Route
            path="/updateProfil"
            element={
              <>
                <Navbar />
                <UpdateProfil />
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

<Route 
  path="/reset/:token" 
  element={<NewPasswordWrapper />} 
/>
<Route path="/confirm/:token" element={<Confirmation/>} />




          <Route
            path="/affectSkill/:id"
            element={
              <>
                <Navbar />
                <AffectSkill />
                <Footer />
              </>
            }
          />

          <Route
            path="/socialSkills/"
            element={
              <>
                <Navbar />
                <SocialSkills />
                <Footer />
              </>
            }
          />
          <Route
            path="/socialSkills/add"
            element={
              <>
                <Navbar />
                <AddSocialSkill />
                <Footer />
              </>
            }
          />

          <Route
            path="/socialSkills/edit/:id"
            element={
              <>
                <Navbar />
                <EditSocialSkill />
                <Footer />
              </>
            }
          />

          <Route
            path="/socialSkills/delete/:id"
            element={
              <>
                <Navbar />
                <DeleteSocialSkill />
                <Footer />
              </>
            }
          />

          <Route
            path="/technicalSkills/"
            element={
              <>
                <Navbar />
                <TechnicalSkills />
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
