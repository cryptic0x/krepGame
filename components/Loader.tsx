import React from 'react'

const Loader = () => (
  <div className='loader'>
    <div>
      <div className='circles'>
        <span className='one' />
        <span className='two' />
        <span className='three' />
      </div>
      <div className='pacman'>
        <span className='top' />
        <span className='bottom' />
        <span className='left' />
        <div className='eye' />
      </div>
    </div>
  </div>
)

export default Loader
