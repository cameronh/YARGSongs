import React from 'react';
import './Pagination.css';
import SearchFilter from '../SearchFilter/SearchFilter.jsx';

function Pagination({ page, setPage, totalPages, pageSize, setPageSize }) {
  const pagesShown = 10;
  const currentSet = Math.floor((page - 1) / pagesShown); // Defines the "set" of pages you are on (0 for 1-10, 1 for 11-20, etc.)

  const handleClick = (i) => {
    const newPage = i + (currentSet * pagesShown); // Calculate the actual page number based on the current set.
    setPage(newPage);
  };

  const goToNextSet = () => {
    if ((currentSet + 1) * pagesShown < totalPages) {
      setPage((currentSet + 1) * pagesShown + 1);
    }
  };

  const goToPrevSet = () => {
    if (currentSet > 0) {
      setPage((currentSet - 1) * pagesShown + 1);
    }
  };

  return (
    <div>
      <div className="page-container">
        <SearchFilter pageSize={pageSize} setPageSize={setPageSize} />
        {/* Previous set button */}
        {currentSet > 0 && <p onClick={goToPrevSet}>{"<"}</p>}

        {/* Display pages based on the current set */}
        {[...Array(pagesShown)].map((x, i) => {
          const pageNum = i + 1 + (currentSet * pagesShown); // Calculate the actual page number
          if (pageNum <= totalPages) { // Don't display page numbers beyond totalPages
            return (
              <p
                key={pageNum}
                className={pageNum === page ? 'selected' : ''}
                onClick={() => handleClick(i + 1)}
              >
                {pageNum}
              </p>
            );
          }
          return null; // Don't display anything if the page number exceeds totalPages
        })}

        {/* Next set button */}
        {(currentSet + 1) * pagesShown < totalPages && <p onClick={goToNextSet}>{">"}</p>}
        
        {totalPages > pagesShown && <span>...</span>}
        <p onClick={() => handleClick(totalPages)}>{totalPages}</p>
      </div>
    </div>
  );
}

export default Pagination;
