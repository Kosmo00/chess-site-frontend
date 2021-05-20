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
      {`
      ${(show_n_move ||
          movement.getTurnToAnnotate() === 1) ? movement.getNumMoveToAnnote() + '.' +
          (movement.getTurnToAnnotate() === -1 ? '..' : '') : ''}${movement.move}`}
    </span>
  )
}

export default MovementComponent
