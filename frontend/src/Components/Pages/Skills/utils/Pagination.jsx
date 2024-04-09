import React, { useState } from 'react';


const Pagination = ({ postsPerPage,handlePagination   , length,currentPage }) => {

    
    
  const paginationNumbers = [];

  for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
    paginationNumbers.push(i);
  }

  return (
    <div className='pagination'>
      <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>Précédent</button>
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => handlePagination(pageNumber)} className={currentPage === pageNumber ? 'active' : ''}>
          {pageNumber}
        </button>
      ))}
      <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === Math.ceil(length / postsPerPage)}>Suivant</button>
    </div>
  );
};

export default Pagination;