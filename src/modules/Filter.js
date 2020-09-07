import React from 'react'

function Filter({ getSearchParams, searchString }) {
  return (
    <div className="filter">
      <div className="search-on-title">
        <input type="search" placeholder="Поиск по названию" value={searchString} onChange={ (event) => getSearchParams(event.target.value)} />
      </div>
    </div>
  )
}

export default Filter