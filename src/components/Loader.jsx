import React from 'react'
import Header from './Header'

const Loader = () => (
  <div className='container mx-auto text-center'>
    <Header />
    <div className='lds-dual-ring mt-20'></div>
  </div>
)

export default Loader
