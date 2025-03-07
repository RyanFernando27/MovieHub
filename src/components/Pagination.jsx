import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination text-center mt-3 movie-card text-white w-1/2 mx-auto ">
      <button onClick={handlePrevious} disabled={currentPage === 1} className = "p-2 cursor-pointer transition delay-150 duration-300 ease-in-out   hover:bg-indigo-900 ... border-1 border-indigo-900 rounded-xl ">
        Previous
      </button>
      <span className = " p-2">Page {currentPage} of {totalPages}</span>
      <button className = "p-2 cursor-pointer transition delay-150 duration-300 ease-in-out  hover:bg-indigo-900 ... border-1 rounded-xl border-indigo-900" onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
