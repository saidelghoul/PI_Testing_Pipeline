import React from 'react'
import { Link } from 'react-router-dom'

function BackupButtonTechnicalSkills() {
  return (
    <div className='flex'>
        <Link to={`/technicalSkills/`} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
        <button type="button" className="btn btn-primary mt-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1"/>
            </svg>
        </button>
        </Link>
    </div>
  )
}

export default BackupButtonTechnicalSkills
