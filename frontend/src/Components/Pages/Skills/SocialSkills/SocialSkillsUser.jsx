import React, { useContext } from 'react'
import {  useEffect, useState } from "react";
import { UserContext } from "../../../../../context/userContext";
import { Link } from "react-router-dom";
import SocialSkillService from "../../../../services/socialSkill-service";
import Select from "react-select";


function SocialSkillsUSer() {

    const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [assigned, setAssigned] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);


  const [assignedTags, setAssignedTags] = useState([]);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  

  const fetchSkills = async () => {
    const result = await SocialSkillService.getAvailableSocialSkills(user.id);
    setSkills(result);
    setSkills([...result, user.id]);
  };
  const getAssigned = async () => {
    try {
      const skillsData = SocialSkillService.getSocialSkillsByUser(user.id);
      if (skillsData) {
        // Si l'utilisateur existe, mettez à jour l'état userData avec les données de l'utilisateur
        setAssigned(skillsData);
      }
    } catch (error) {
      console.error("Error fetching user skills:", error);
    }
  };
  const handleShowSkillModal = (skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };


  {/*const handleRemove = async (skillid) => {
    const resp = await SocialSkillService.unassignSocialSkillFromUser(
      id,
      skillid
    );

    if (resp.status === 200) {
      alert(" socialSkill deleted successfully");
      handleClose();
      user.socialSkills.filter((element) => element._id !== skillid);
    }
  };*/}
  useEffect(() => {
    // Fonction asynchrone pour récupérer les compétences sociales
    const fetchSocialSkills = async () => {
      try {
        if (user && user.id) {
          //const skills = await SocialSkillService.getSocialSkillsByUser(user.id);
          //setSocialSkills(skills);
        }
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des compétences sociales:",
          error.message
        );
      }
    };

    // Appeler la fonction de récupération des compétences sociales
    fetchSocialSkills();
  }, []);


  const onTagChange = (name, value) => {
    let tags = [];
    value.forEach((element) => {
      tags.push(element.value);
    });

  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
        <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="skills-open">
                            Skills
                          </a>{" "}
                          <a href="#" title="" className="skills-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          <Link to={`/affectSkill/${user?.id}`}>
                            <i className="fa fa-plus-square"></i>
                          </Link>
                        </h3>

                        {/* */}

                        {user?.socialSkills?.length > 0 ? (
                          <ul className="skill-tags">
                            {user?.socialSkills?.map((skill) => (
                              <li key={skill?._id}>
                                <a
                                  title={skill?.name}
                                  onClick={() => handleShowSkillModal(skill)}
                                >
                                  {skill?.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div>
                            vous navez encore aucun skills. Rajoutez-en pour
                            personnaliszer votre profil !
                          </div>
                        )}
                      </div>
                      </div>
  )
}
}

export default SocialSkillsUSer