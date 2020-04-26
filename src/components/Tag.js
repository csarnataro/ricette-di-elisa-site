import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ children }) => (
  <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
    {children}
  </span>
);

Tag.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Tag;
