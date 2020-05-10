import React, { memo } from 'react'
import PropTypes from 'prop-types'

const TabButton = ({ label, isActive = false, onClickCategory }) => {
  const buttonStyle = isActive
    ? 'bg-red-700 text-white'
    : 'bg-orange-300 hover:bg-red-700 text-black hover:text-white'

  if (!label) {
    return null
  }
  return (
    <button
      onClick={onClickCategory}
      className={`${buttonStyle} px-3 py-1 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 inline-block`}
    >
      {label}
    </button>
  )
}

TabButton.propTypes = {
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}

TabButton.defaultProps = {
  isActive: false
}

export default memo(TabButton)
