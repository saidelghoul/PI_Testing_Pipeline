import "../../public/assets/css/animate.css";
import "../../public/assets/css/bootstrap.min.css";
import "../../public/assets/css/line-awesome.css";
import "../../public/assets/css/line-awesome-font-awesome.min.css";
import "../../public/assets/vendor/fontawesome-free/css/all.min.css";
import "../../public/assets/css/font-awesome.min.css";
import "../../public/assets/css/style.css";
import "../../public/assets/css/responsive.css";
import "../../public/assets/lib/slick/slick.css";
import "../../public/assets/lib/slick/slick-theme.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState("tab-1");
  const [departements, setDepartements] = useState([]);
  const [selectedDepartementId, setSelectedDepartementId] = useState("");
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    // Récupérer les départements depuis le backend
    axios
      .get("/departement/departements")
      .then((response) => {
        setDepartements(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving departments:", error);
      });
  }, []);

  const handleDepartementChange = (e) => {
    const id = e.target.value;
    setSelectedDepartementId(id);
    axios
      .get(`/departement/departement/${id}/unites`)
      .then((response) => {
        setUnits(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving associated units:", error);
      });
  };
  const handleUnitChange = (e) => {
    setSelectedUnitId(e.target.value);
  };

  const navigate = useNavigate();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        navigate("/home");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [registerdata, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    role: "",
    departement: "",
    unite: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    const {
      name,
      email,
      confirmedPassword,
      password,
      role,
      //departement,
      //unite,
    } = registerdata;

    // Vérifier si un département a été sélectionné
    if (!selectedDepartementId) {
      toast.error("Please select a department.");
      return;
    }

    if (
      !name ||
      !email ||
      !password ||
      !confirmedPassword ||
      !role ||
      !selectedDepartementId ||
      !selectedUnitId
    ) {
      toast.error("All fields are mandatory.");
      return;
    }
    if (!email.endsWith("@esprit.tn")) {
      toast.error("The email must end with @esprit.tn");
      return;
    }
    if (password.length < 6) {
      toast.error("The password must be at least 6 characters long.");
      return;
    }

    try {
      const { data1 } = await axios.post("/register", {
        name,
        email,
        password,
        confirmedPassword,
        role,
        departement: selectedDepartementId, // Passer l'ID du département sélectionné
        unite: selectedUnitId, // Passer l'ID de l'unité sélectionnée
      });
      navigate("/success");
      if (data1.error) {
        toast.error(data1.error);
      } else {
        setRegisterData({});
        navigate("/success");

        setActiveTab("tab-1");

        toast.success("inscription successful. Welcome!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-in-page " style={{ backgroundColor: "#dc3545" }}>
      <div className="signin-popup">
        <div className="signin-pop">
          <div className="row">
            <div className="col-lg-6">
              <div className="cmp-info">
                <div className="cm-logo">
                  <img src="/assets/images/logo/logo.png" alt="" />
                </div>
                <img src="/assets/images/cm-main-img.png" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login-sec">
                <ul className="sign-control">
                  <li
                    data-tab="tab-1"
                    className={activeTab === "tab-1" ? "current" : ""}
                    onClick={() => handleTabChange("tab-1")}
                  >
                    <a href="#" title="">
                      Sign in
                    </a>
                  </li>
                  <li
                    data-tab="tab-2"
                    className={activeTab === "tab-2" ? "current" : ""}
                    onClick={() => handleTabChange("tab-2")}
                  >
                    <a href="#" title="">
                      Sign up
                    </a>
                  </li>
                </ul>
                <div
                  className={`sign_in_sec ${
                    activeTab === "tab-1" ? "current" : ""
                  }`}
                  id="tab-1"
                >
                  <h3>Sign in</h3>
                  <form onSubmit={loginUser}>
                    <div className="row">
                      <div className="col-lg-12 no-pdd">
                        <br />
                        <br />
                        <br />

                        <div className="sn-field">
                          <input
                            type="text"
                            name="email"
                            placeholder="email .. "
                            value={data.email}
                            onChange={(e) =>
                              setData({ ...data, email: e.target.value })
                            }
                          />
                          <i className="la la-user"></i>
                        </div>
                      </div>
                      <div className="col-lg-12 no-pdd">
                        <div className="sn-field">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                              setData({ ...data, password: e.target.value })
                            }
                          />
                          <i className="la la-lock"></i>
                        </div>
                      </div>
                      <div className="col-lg-12 no-pdd">
                        <div className="checky-sec">
                          <div className="fgt-sec">
                            <input type="checkbox" name="cc" id="c1" />
                            <label htmlFor="c1">
                              <span></span>
                            </label>
                            <small>Remember me</small>
                          </div>
                          <a href="/forgotPassword" title="">
                            Forgot Password?
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-12 no-pdd">
                        <button type="submit" value="submit">
                          Sign in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div
                  className={`sign_in_sec ${
                    activeTab === "tab-2" ? "current" : ""
                  }`}
                  id="tab-2"
                >
                  <div className="dff-tab current" id="tab-3">
                    <form onSubmit={registerUser}>
                      <div className="row">
                        <div className="signup-tab">
                          <h2>What is your profession</h2>
                          <div className="sn-field">
                            <select
                              name="role"
                              value={registerdata.role}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerdata,
                                  role: e.target.value,
                                })
                              }
                            >
                              <option>choose your role</option>
                              {/* <option value="Directeur d'étude">
                                  Directeur d'étude
                                </option> */}
                              <option value="Chef département">
                                Chef departement
                              </option>
                              <option value="Chef unité">Chef unit</option>
                              <option value="Enseignant">Teacher</option>
                            </select>
                            <i className="fa fa-address-card-o"></i>
                            <span>
                              <i className="fa fa-ellipsis-h"></i>
                            </span>
                          </div>
                        </div>

                        <div className="col-lg-12 no-pdd">
                          <div className="sn-field">
                            <input
                              type="text"
                              name="name"
                              placeholder="nom et prenom"
                              value={registerdata.name}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerdata,
                                  name: e.target.value,
                                })
                              }
                            />
                            <i className="la la-user"></i>
                          </div>
                        </div>
                        <div className="col-lg-12 no-pdd">
                          <div className="sn-field">
                            <input
                              type="email"
                              name="email"
                              placeholder="email"
                              value={registerdata.email}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerdata,
                                  email: e.target.value,
                                })
                              }
                            />
                            <i className="fa fa-envelope"></i>
                          </div>
                        </div>
                        <div className="sn-field">
                          <select
                            name="departement"
                            value={registerdata.selectedDepartementId}
                            onChange={handleDepartementChange}
                          >
                            <option value="" disabled>
            Choose a department
          </option>
                            {departements.map((departement) => (

                              <option
                                key={departement._id}
                                value={departement._id}
                              >
                                {departement.name}
                              </option>
                            ))}
                          </select>
                          <i className="fa fa-university"></i>
                          <span>
                            <i className="fa fa-ellipsis-h"></i>
                          </span>
                        </div>
                        <div className="sn-field">
                          <select
                            name="unite"
                            value={registerdata.selectedUnitId}
                            onChange={handleUnitChange}
                            disabled={!selectedDepartementId} // Désactiver si aucun département n'est sélectionné
                          >
                            <option value="" disabled>
            Choose a unit
          </option>
                            {units.map((unit) => (

                              <option key={unit._id} value={unit._id}>
                                {unit.name}
                              </option>
                            ))}
                          </select>
                          <i className="fa fa-university"></i>
                          <span>
                            <i className="fa fa-ellipsis-h"></i>
                          </span>
                        </div>

                        <div className="col-lg-12 no-pdd">
                          <div className="sn-field">
                            <input
                              type="password"
                              name="password"
                              placeholder="password"
                              value={registerdata.password}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerdata,
                                  password: e.target.value,
                                })
                              }
                            />
                            <i className="la la-lock"></i>
                          </div>
                        </div>
                        <div className="col-lg-12 no-pdd">
                          <div className="sn-field">
                            <input
                              type="password"
                              name="repeat-password"
                              placeholder="repeat password.."
                              value={registerdata.confirmedPassword}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerdata,
                                  confirmedPassword: e.target.value,
                                })
                              }
                            />
                            <i className="la la-lock"></i>
                          </div>
                        </div>

                        <div className="col-lg-12 no-pdd">
                          <button type="submit" value="submit">
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footy-sec">
        <div className="container">
          <ul>
            <li>
              <a href="help-center.html" title="">
                Help Center
              </a>
            </li>
            <li>
              <a href="about.html" title="">
                About
              </a>
            </li>
            <li>
              <a href="#" title="">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" title="">
                Community Guidelines
              </a>
            </li>
            <li>
              <a href="#" title="">
                Cookies Policy
              </a>
            </li>
            <li>
              <a href="#" title="">
                Career
              </a>
            </li>
            <li>
              <a href="forum.html" title="">
                Forum
              </a>
            </li>
            <li>
              <a href="#" title="">
                Language
              </a>
            </li>
            <li>
              <a href="#" title="">
                Copyright Policy
              </a>
            </li>
          </ul>
          <p>
            <img src="/assets/images/copy-icon.png" alt="" />
            Copyright 2024
          </p>
        </div>
      </div>
    </div>
  );
}
