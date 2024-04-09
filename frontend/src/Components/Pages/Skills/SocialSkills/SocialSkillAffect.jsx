import React from 'react'
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../../context/userContext";
import axios from "axios";

import SocialSkillService from "../../../../services/socialSkill-service";
import AddSkillForm from "../../../Modals/Skills/AssignSkillForm";
import SkillModal from "../../../Modals/Skills/SkillModal";
import { Link } from "react-router-dom";

function SocialSkillAffect({userId}) {
  return (
    <div className="product-feed-tab" id="info-dd">
                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="overview-open">
                            Overview
                          </a>{" "}
                          <a href="#" title="" className="overview-open">
                            <i className="fa fa-pencil"></i>
                          </a>
                        </h3>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque tempor aliquam felis, nec condimentum
                          ipsum commodo id. Vivamus sit amet augue nec urna
                          efficitur tincidunt. Vivamus consectetur aliquam
                          lectus commodo viverra. Nunc eu augue nec arcu
                          efficitur faucibus. Aliquam accumsan ac magna
                          convallis bibendum. Quisque laoreet augue eget augue
                          fermentum scelerisque. Vivamus dignissim mollis est
                          dictum blandit. Nam porta auctor neque sed congue.
                          Nullam rutrum eget ex at maximus. Lorem ipsum dolor
                          sit amet, consectetur adipiscing elit. Donec eget
                          vestibulum lorem.
                        </p>
                      </div>

                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="ed-box-open">
                            Education/Technical Skills
                          </a>{" "}
                          <a href="#" title="" className="ed-box-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          <a href="#" title="">
                            <i className="fa fa-plus-square"></i>
                          </a>
                        </h3>
                        <h4>Master of Computer Science</h4>
                        <span>2015 - 2018</span>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Quisque tempor aliquam felis, nec condimentum
                          ipsum commodo id. Vivamus sit amet augue nec urna
                          efficitur tincidunt. Vivamus consectetur aliquam
                          lectus commodo viverra.{" "}
                        </p>
                      </div>
                      
                      <div className="user-profile-ov">
                        <h3>
                          <a href="#" title="" className="skills-open">
                            Skills
                          </a>{" "}
                          <a href="#" title="" className="skills-open">
                            <i className="fa fa-pencil"></i>
                          </a>{" "}
                          
                         
                          {/*<Link to={`/affectSkill/${user._id}` }>
                          <i className="fa fa-plus-square"></i>
                            </Link>*/}
                            <Link to={`/affectSkill/${userId}`}>
                            <i className="fa fa-plus-square"></i>
                                </Link>

                        </h3>
                        {/*<Link to ={` /affectSkill/${user._id}`}><i className="fa fa-plus-square"></i></Link>*/}
                        {/* */}
                      </div>
                    </div>
  )
}

export default SocialSkillAffect