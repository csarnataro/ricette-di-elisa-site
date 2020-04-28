/* eslint-disable react/no-danger */
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import slugify from '../utils/slugify'
import Tag from './Tag'

const Button = () => {
  return (
    <span
      alt='Vai alla ricetta'
      className='bg-red-700 text-white mb-2 ml-2 px-3 py-1 rounded transition duration-500 ease-in-out transform hover:-translate-y-1'
    >
      Vai alla ricetta &raquo;
    </span>
  )
}

const Card = ({ recipe }) => {
  const showSkeleton = !recipe.title
  const url = `/ricetta/${slugify(recipe.title)}-${recipe.id}`
  return (
    <Link alt='Vai alla ricetta' to={url}>
      <div className='max-w-sm rounded overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl'>
        <div className='px-6 pt-4 pb-2 bg-orange-200'>
          <div className='font-bold text-xl mb-2'>
            {showSkeleton ? <Skeleton /> : recipe.title}
          </div>
          <div className='text-xs text-right text-gray-900 mb-2'>
            {// eslint-disable-next-line no-nested-ternary
            showSkeleton ? (
              <Skeleton width={100} />
            ) : recipe.suggestedBy ? (
              `Suggerita da: ${recipe.suggestedBy}`
            ) : (
              <span>&nbsp;</span>
            )}
          </div>
        </div>
        <div className='px-6 py-4'>
          <p className='uppercase text-xs text-gray-500'>Ingredienti</p>
          <p>
            {showSkeleton ? (
              <Skeleton count={2} />
            ) : (
              <Truncate className='text-gray-700 text-base' lines={2}>
                {recipe.ingredients}
              </Truncate>
            )}
          </p>
        </div>
        <div className='px-6'>
          <p className='uppercase text-xs text-gray-500'>Esecuzione</p>
          <p>
            {showSkeleton ? (
              <Skeleton count={4} />
            ) : (
              <Truncate className='text-gray-700 text-base' lines={4}>
                {recipe.process}
              </Truncate>
            )}
          </p>
        </div>
        <div className='px-6 py-4'>
          {showSkeleton ? (
            <Skeleton width={100} height={25} />
          ) : (
            recipe.tags &&
            recipe.tags.map(tag => <Tag key={tag}>{`#${tag}`}</Tag>)
          )}
        </div>
        <div className='px-6 py-4 text-right'>
          {showSkeleton ? (
            <Skeleton width={130} height={30} />
          ) : (
            <Button url={url} />
          )}
        </div>
      </div>
    </Link>
  )
}

Card.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    ingredients: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    process: PropTypes.string,
    suggestedBy: PropTypes.string
  })
}

Card.defaultProps = {
  recipe: {}
}
export default memo(Card)
