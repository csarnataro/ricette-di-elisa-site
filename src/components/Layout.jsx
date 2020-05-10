/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'

const Layout = ({ doSearch, children }) => {
  return (
    <div className='bg-white'>
      <div className='container mx-auto'>
        <Header doSearch={doSearch} />
        <main className='w-full'>{children}</main>
        <footer className='border-t border-orange-300 py-10 mt-10'>
          Copyright here
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
