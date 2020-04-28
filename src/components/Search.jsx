import React from 'react'

const handleEnter = e => {
  if (e.key === 'Enter') {
    console.log('do validate')
  }
}

const SearchBox = ({ show, text, updateText, submitSearch }) => (
  <div className={`relative ${show || 'hidden'}`}>
    <div className='absolute z-50 inset-x-0 pr-0 lg:pr-6'>
      <div
        className='relative bg-white shadow-xl border border-solid border-gray-100'
        id='search-content'
      >
        <div className='container relative mx-auto py-4 text-black'>
          <input
            id='searchfield'
            value={text}
            onChange={e => updateText(e.target.value)}
            type='search'
            onKeyDown={handleEnter}
            placeholder='Cerca ricette...'
            autoFocus='autofocus'
            className='text-grey-800 min-w-full transition focus:outline-none focus:border-transparent p-2 px-6 appearance-none leading-normal text-xl lg:text-2xl'
          />
        </div>
      </div>
    </div>
  </div>
)

const Magnifier = ({ onClick }) => (
  <div
    id='search-toggle'
    onClick={onClick}
    className='search-icon cursor-pointer py-3 inline mx-3'
  >
    <svg
      className='fill-current pointer-events-none text-grey-darkest w-4 h-4 inline'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
    >
      <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
    </svg>
  </div>
)

export { SearchBox, Magnifier }
