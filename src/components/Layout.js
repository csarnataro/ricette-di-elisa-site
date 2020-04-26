/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

// Inside your component
const Layout = ({ children }) => {
  return (
    <div className='bg-white'>
      <div className='container mx-auto'>
        <h1 className='w-full py-1 lg:py-10 text-center text-3xl lg:text-6xl'>
          Le ricette di Elisa
        </h1>
        <hr />
        <main className='w-full'>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
