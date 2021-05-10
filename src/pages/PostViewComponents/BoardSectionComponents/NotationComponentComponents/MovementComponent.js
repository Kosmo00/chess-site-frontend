import React from 'react'

const MovementComponent = ({ movement, event, selected_move, show_n_move }) => {
  return (
    <span
      className='mr-2'
      onClick={() => event({ type: 'change cursor', value: movement })}
      style={{
        backgroundColor: selected_move ? 'black' : 'white',
        color: selected_move ? 'white' : 'black',
        cursor: 'pointer'
      }}
    >
      {show_n_move && `${movement.n_move}-`}
      {movement.move}
    </span>
  )
}

export default React.memo(MovementComponent)
