/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div className='bg-white'>
      <div className='container mx-auto'>
        <div>
          <h1 className='w-full py-1 lg:py-10 text-center text-3xl lg:text-6xl'>
            Le ricette di Elisa
          </h1>
        </div>
        <hr />
        <main className='w-full'>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
