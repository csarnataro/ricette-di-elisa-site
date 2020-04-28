import React, { memo } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Magnifier } from './Search'
import TabButton from './TabButton'

const CategoriesBar = ({ categories, categoryName, onClickSearchIcon }) => (
  <div className='w-full justify-center flex-wrap my-2 lg:my-6 flex flex-row'>
    <span className='m-1'>
      {/* 
      <Magnifier onClick={onClickSearchIcon} />
      */}

      <TabButton
        url='/'
        label='Tutte'
        isActive={categoryName === 'tutte-le-ricette'}
      />
    </span>
    {categories
      ? categories.map(category => (
          <span className='m-1' key={category.id}>
            <TabButton
              url={`/${category.name.toLowerCase()}`}
              label={category.name}
              isActive={categoryName === category.name.toLowerCase()}
            />
          </span>
        ))
      : [1, 2, 3].map(i => (
          <span key={i} className='mx-1'>
            <Skeleton width={80} height={32} />
          </span>
        ))}
  </div>
)

export default memo(CategoriesBar)
