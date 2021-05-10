import React, { useContext } from 'react'

// chess-site components
import MovementComponent from './MovementComponent'

// chess-site contexts
import { BoardContext } from '../../BoardSection'

const NotationBuilder = () => {
  const boardContext = useContext(BoardContext)
  const { boardState, boardDispatch } = boardContext

  return (
    <div className='d-flex flex-wrap'>
      {prepareComponents(boardState.notation, boardDispatch, boardState.cursor)}
    </div>
  )
}

const prepareComponents = (notation, boardDispatch, cursor) => {
  if (notation.children_array !== undefined && notation.children_array.length === 0) {
    return ''
  }
  let show_n_move = false
  if (notation.piece_to_move === 'w') {
    show_n_move = true
  }
  let movements = [
    <MovementComponent
      key={notation.children_array[0].id}
      movement={notation.children_array[0]}
      show_n_move={show_n_move}
      event={boardDispatch}
      selected_move={cursor === notation.children_array[0] ? true : false}
    />
  ]
  if (notation.children_array.length > 1) {
    movements.push('(')
    for (let i = 1; i < notation.children_array.length; i++) {
      movements.push(
        <MovementComponent
          key={notation.children_array[i].id}
          movement={notation.children_array[i]}
          show_n_move={show_n_move}
          event={boardDispatch}
          selected_move={cursor === notation.children_array[i] ? true : false}
        />
      )
      movements.push(...prepareComponents(notation.children_array[i], boardDispatch, cursor))
      movements.push(';')
    }
    movements.pop()
    movements.push(')')
  }
  movements.push(...prepareComponents(notation.children_array[0], boardDispatch, cursor))

  return movements
}



export default React.memo(NotationBuilder)
