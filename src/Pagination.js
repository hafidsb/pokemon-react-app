import React from 'react'

export default function Pagination({ goToNextPage, goToPreviousPage }) {
  return (
    <div>
      {goToPreviousPage && <button onClick={goToPreviousPage}>Previous Page</button>}
      {goToNextPage && <button onClick={goToNextPage}>Next Page</button>}
    </div>
  )
}
