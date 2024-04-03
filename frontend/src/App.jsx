import "./App.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Profil from "./Components/Pages/Profils";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

import SignIn from "./Components/SignIn";
import AccountSetting from "./Components/Pages/AccountSetting";
import Groups from "./Components/Pages/Groups";
import Messages from "./Components/Pages/Messages";
import Activites from "./Components/Pages/Activites";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/userContext";
import ActivityDetails from "./Components/Pages/ActivityDetails";
import TaskDetails from "./Components/Pages/TaskDetails";
import AccountUpdate from "./Components/Pages/AccountUpdate";
import Home from "./Components/Home/Home";
import UpdatePublication from "./Components/Home/UpdatePublication";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <UserContextProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Router>
          <Routes>
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
              path="/update/:id"
              element={
                <>
                  <Navbar />
                  <UpdatePublication />
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
    </>
  );
}

export default App;
