import React from 'react'

// chess-site HOCs
import WithCenterContainer from '../_HOCs/WithCenterContainer'

function SiteError() {
  return (
    <WithCenterContainer>
      <div className='display-4'>Ups</div>
      <div className='display-1'> An error was ocurred... </div>
      <div className='display-3'> Try reload</div>
    </WithCenterContainer >
  )
}

export default SiteError
