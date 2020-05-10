import React, { useState } from 'react'
import { Search } from 'react-feather'
import { SearchBox } from './Search'

export default ({ doSearch }) => {
  const [mustShowSearchBox, setShowSearchBox] = useState(false)

  const onClickSearchIcon = () => {
    setShowSearchBox(!mustShowSearchBox)
  }

  return (
    <header className='relative border-b border-orange-300'>
      <h1 className='w-full py-1 lg:py-10 text-center text-3xl lg:text-6xl'>
        Le ricette di Elisa
      </h1>
      {doSearch && typeof doSearch === 'function' && (
        <>
          <div className='absolute lg:mr-12 lg:mt-12 mt-1 inset-y-0 right-0 lg:w-8 '>
            <button className='lg:p-6 p-3' onClick={onClickSearchIcon}>
              <Search className='w-6 h-6 lg:w-10 lg:h-10' />
            </button>
          </div>
          <SearchBox
            show={mustShowSearchBox}
            submitSearch={doSearch}
            /*value => {
          fetchRecipesByQuery(value)
          // console.log(`Should be searching ${value}`)
          setShowSearchBox(false)
        }*/
            resetSearch={e => setShowSearchBox(false)}
          />
        </>
      )}
    </header>
  )
}
