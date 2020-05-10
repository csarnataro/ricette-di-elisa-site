import React, { useState, useRef, useEffect } from 'react'
import { Search, X } from 'react-feather'

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
    <div
      className={`absolute transition-all transform ease-in-out duration-500 inset-0 bg-white pt-12 ${
        show ? '' : 'hidden'
      }`}
    >
      <div className='z-50 pr-0 lg:pr-6'>
        <div className='relative shadow-xl' id='search-content'>
          <div className='container rounded-r bg-orange-200 relative mx-auto py-4 text-black'>
            <input
              ref={ref}
              id='searchfield'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              type='search'
              onKeyDown={handleKeyDown}
              placeholder='Cosa stai cercando...'
              autoFocus='autofocus'
              className='bg-orange-200 inline text-grey-800 min-w-full transition focus:outline-none focus:border-transparent p-2 px-6 pr-40 appearance-none leading-normal text-xl lg:text-2xl'
            />
          </div>
          <button
            type='button'
            onClick={e => setSearchText('')}
            className={`px-3 pt-1 inline mt-6 mr-24 absolute top-0 right-0`}
          >
            <X />
          </button>
          <button
            type='button'
            onClick={e => searchQueryAndSubmit(searchText)}
            className='rounded-r inset-y-0 text-white bg-red-700 p-6 inline absolute top-0 right-0'
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
