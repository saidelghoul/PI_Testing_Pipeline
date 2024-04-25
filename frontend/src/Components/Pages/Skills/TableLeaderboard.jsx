import React, { useEffect, useState } from 'react'
import socialSkillService from '../../../services/socialSkill-service';


function TableLeaderboard({user}) {

    const [totalPointSocialPerUser, setTotalPointSocialPerUser] = useState(0);

    

    useEffect(() => {
    const getSocialSkillsbyuser = async () => {
        const result = await socialSkillService.getSocialSkillsByUser(user._id); 
        let score = 0;
        console.log(result);
        if (result.message.length == 0 ) {score =1}
        else {result.message.forEach(skills => score += skills.pointSocial)}
        setTotalPointSocialPerUser(score)
    }
    
    getSocialSkillsbyuser()},[user._id]);
  return (
    <>{totalPointSocialPerUser}</>
  )
}

export default TableLeaderboard