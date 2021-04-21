import React from 'react'

// chess-site HOCs
import WithCenterContainer from './_HOCs/WithCenterContainer'

const NotFound = () => {
  return (
    <WithCenterContainer>
      <p className='display-4'>Ups
          <span className='display-1'> 404</span>
        <span className='display-3'> Not Found</span>
      </p>
    </WithCenterContainer>
  )
}

export default NotFound
