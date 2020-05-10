/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import { GitHub } from 'react-feather'

const Layout = ({ doSearch, children }) => {
  return (
    <div className='bg-white'>
      <div className='container mx-auto'>
        <Header doSearch={doSearch} />
        <main className='w-full'>{children}</main>
        <footer className='text-center border-t border-orange-300 py-10 mt-10 text-gray-600'>
          <span className='mr-3 inline-block'>
            &copy; {new Date().getFullYear()} ricette-di-elisa.netlify.app
          </span>
          |
          <span className='mx-3 inline-block'>
            Design inspired by{' '}
            <a className='underline' href='https://recipes-demo.marinda.me/'>
              recipes-demo.marinda.me
            </a>
          </span>
          |
          <span className='ml-3 inline-block'>
            <a href='https://github.com/csarnataro/ricette-di-elisa-site'>
              GitHub <GitHub className='inline-block w-3 h-3' />
            </a>
          </span>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
