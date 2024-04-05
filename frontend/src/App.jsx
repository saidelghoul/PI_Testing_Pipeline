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

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
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
            path="/completerProfil"
            element={
              <>
                <Navbar />
                <AccountUpdate />
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
