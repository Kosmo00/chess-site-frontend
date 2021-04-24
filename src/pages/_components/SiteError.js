import React from 'react'

// chess-site HOCs
import WithCenterContainer from '../_HOCs/WithCenterContainer'

function SiteError() {
  return (
    <WithCenterContainer>
      <div className='d-none d-lg-block text-center'>
        <div className='display-4'>Ups</div>
        <div className='display-1 text-wrap'> Un error ocurrió... </div>
        <div className='display-3'> Intente recargar</div>
      </div>

      <div className='d-md-none text-center mt-5'>
        <div className='display-4'>Ups</div>
        <div className='display-3 text-wrap'> Un error ocurrió... </div>
        <div className='h1'> Intente recargar</div>
      </div>
    </WithCenterContainer >
  )
}

export default SiteError
