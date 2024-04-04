import React, { useEffect, useState } from 'react'
import socialSkillService from '../../../../services/socialSkill-service';
import { Link } from 'react-router-dom';
import {  Spinner,  } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';




function SocialSkills() {
    const [socialSkills,setSocialSkills] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {

        const fetchSocialSkills = async() => {
            const listSocialSkills = await socialSkillService.getAllSocialSkills();
            setSocialSkills(listSocialSkills);
            setLoading(false);
        }

        fetchSocialSkills();       
    },[])
  return (
    <>
    <div className='p-4'>
      
        <div className='flex justify-between items-center'>
            <Link to={`/socialSkills/add`}>
            <div className="btn-group">
                <button type="button" className="btn btn-primary mt-5" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"></path>
                  </svg>
                  <div> <span className="visually-hidden ">Add a new Skill</span></div>
                </button>
                </div>
            </Link>
           

        </div> <br/>
        {loading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
         ) : (
            <Table striped bordered hover>
      <thead>
        <tr>
          <th className='text-center'>#</th>
          <th className='text-center'>Name</th>
          <th className='text-center'>Niveau</th>
          <th className='text-center'>Points</th>
          <th className='text-center'>Description</th>
          <th className='text-center'>Operations</th>
        </tr>
      </thead>
      <tbody>
        {socialSkills.map((socialSkill, index) => (
            <tr key ={socialSkill._id} className='h-8'>
                <td className='border border-slate-700 rounded-md text-center'>
                  {index+1}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {socialSkill.name}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {socialSkill.niveau}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {socialSkill.pointSocial}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>
                  {socialSkill.description}
                </td>
                <td className='border border-slate-700 rounded-md text-center'>

                <div className="btn-group">

                <Link to={`/socialSkills/edit/${socialSkill._id}`}>
                <button type="button" className="btn btn-outline-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                  <span className="visually-hidden">Edit</span>
                </button>
                </Link>
                
                <Link to={`/socialSkills/delete/${socialSkill._id}`}>
                <button type="button" className="btn btn-outline-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                </svg>
                  <span className="visually-hidden">Delete</span>
                </button>
                </Link>
              </div>                
              </td>
                

            </tr>
        ))}
      </tbody>
    </Table>

         )}
    </div>
    </>
  )
}

export default SocialSkills