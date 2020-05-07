import React, { useState, useRef, useEffect } from 'react'
import { Search } from 'react-feather'

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
            <Search />
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
      className={`${className} h-8 mx-1 px-2 py-1 rounded`}
    >
      <Search className='h-4' />
    </button>
  )
}

export { SearchBox, Magnifier }
