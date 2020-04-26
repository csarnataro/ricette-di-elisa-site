import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TabButton = ({ label, isActive = false, url }) => {
  const buttonStyle = isActive
    ? 'bg-red-700 text-white'
    : 'bg-orange-300 hover:bg-red-700 text-black hover:text-white';

  if (!label) {
    return null;
  }
  return (
    <Link
      to={url}
      role='button'
      className={`${buttonStyle} px-3 py-1 rounded transition duration-500 ease-in-out transform hover:-translate-y-1 inline-block`}
    >
      {label}
    </Link>
  );
};

TabButton.propTypes = {
  label: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

TabButton.defaultProps = {
  isActive: false,
};

export default TabButton;
