import React, { useState, useRef, useEffect } from 'react'

const SearchBox = ({ show, submitSearch, resetSearch }) => {
  const [searchText, setSearchText] = useState('')
  const ref = useRef(null)

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      searchQueryAndSubmit(searchText)
      setSearchText('')
    } else if (e.key === 'Escape') {
      resetSearch()
      setSearchText('')
    }
  }

  const searchQueryAndSubmit = query => {
    if (query.trim() !== '') {
      submitSearch(query)
    }
  }

  useEffect(() => ref.current.focus())

  return (
    <div className={`relative ${show || 'hidden'}`}>
      <div className='absolute z-50 inset-x-0 pr-0 lg:pr-6'>
        <div
          className='relative bg-white shadow-xl border border-solid border-gray-100'
          id='search-content'
        >
          <div className='container relative mx-auto py-4 text-black'>
            <input
              ref={ref}
              id='searchfield'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              type='search'
              onKeyDown={handleKeyDown}
              placeholder='Cerca ricette...'
              autoFocus='autofocus'
              className='inline text-grey-800 min-w-full transition focus:outline-none focus:border-transparent p-2 px-6 pr-16 appearance-none leading-normal text-xl lg:text-2xl'
            />
          </div>
          <button
            type='button'
            onClick={e => searchQueryAndSubmit(searchText)}
            className='px-3 pt-1 inline mt-6 mr-4 absolute top-0 right-0'
          >
            <MagnifierIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

const Magnifier = ({ isActive, onClick }) => {
  const className = isActive
    ? 'bg-red-700 text-white'
    : 'bg-orange-300 text-black'
  return (
    <button
      id='search-toggle'
      onClick={onClick}
      className={`${className} search-icon cursor-pointer inline mx-3  px-2 py-1 rounded`}
    >
      <MagnifierIcon />
    </button>
  )
}

const MagnifierIcon = () => (
  <svg
    className='fill-current pointer-events-none text-grey-darkest w-4 h-4 inline'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 20 20'
  >
    <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
  </svg>
)

export { SearchBox, Magnifier }
