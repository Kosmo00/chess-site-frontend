import React, { useEffect, useState } from 'react'
import useResizeAware from 'react-resize-aware'

// react-bootstrap components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import BoardComponent from './BoardSectionComponents/BoardComponent'
import NotationComponent from './BoardSectionComponents/NotationComponent'

// chess-site reducers
import useBoardReducer from './BoardSectionHooks/useBoardReducer'

export const BoardContext = React.createContext()

const BoardSection = () => {
  const [resizeListener, sizes] = useResizeAware()
  const { boardState, boardDispatch } = useBoardReducer()

  const [variantsView, setVariantsView] = useState(false)

  useEffect(() => {
    window.onkeydown = ('keypress', ev => {
      if (ev.code === 'ArrowLeft' && boardState.cursor.parent !== null) {
        boardDispatch({ type: 'change cursor', value: boardState.cursor.parent })
      }
      if (ev.code === 'ArrowRight' && boardState.cursor.children_array !== undefined && boardState.cursor.children_array.length > 0) {
        boardDispatch({ type: 'change cursor', value: boardState.cursor.children_array[0] })
      }
    })
    return () => {
      //window.removeEventListener('keypress')
    }
  }, [boardState, boardDispatch])

  return (
    <Row>
      <BoardContext.Provider value={{ boardState: boardState, boardDispatch: boardDispatch }}>
        <Col xs={7}>
          {resizeListener}
          <BoardComponent width={sizes.width} boardState={boardState} />
        </Col>
        <Col xs={5}>
          <NotationComponent height={sizes.width - 32 - sizes.width % 8} />
        </Col>
      </BoardContext.Provider>
    </Row>
  )
}

export default BoardSection
