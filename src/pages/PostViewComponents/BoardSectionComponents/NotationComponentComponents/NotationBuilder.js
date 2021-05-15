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

const prepareComponents = (notation, boardDispatch, cursor, show_n_move = true) => {
  const { children_array } = notation
  const has_variants = children_array.length > 1
  if (children_array !== undefined && children_array.length === 0) {
    return ''
  }
  let movements = [
    <MovementComponent
      key={children_array[0].id}
      movement={children_array[0]}
      show_n_move={show_n_move}
      event={boardDispatch}
      selected_move={cursor === children_array[0]}
    />
  ]
  if (has_variants) {
    movements.push('(')
    for (let i = 1; i < children_array.length; i++) {
      movements.push(
        <MovementComponent
          key={children_array[i].id}
          movement={children_array[i]}
          show_n_move={true}
          event={boardDispatch}
          selected_move={cursor === children_array[i]}
        />
      )
      movements.push(...prepareComponents(children_array[i], boardDispatch, cursor))
      movements.push(';')
    }
    movements.pop()
    movements.push(')')
  }
  movements.push(...prepareComponents(children_array[0], boardDispatch, cursor, has_variants))

  return movements
}



export default React.memo(NotationBuilder)
