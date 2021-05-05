import React from 'react'
import useResizeAware from 'react-resize-aware'

// react-bootstrap components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import BoardComponent from './BoardSectionComponents/BoardComponent'
import NotationComponent from './BoardSectionComponents/NotationComponent'

// chess-site reducers
import useBoardSectionReducer from './BoardSectionHooks/BoardSectionReducer'

export const BoardContext = React.createContext()

const BoardSection = () => {
  const [resizeListener, sizes] = useResizeAware()
  const { boardState, boardDispatch } = useBoardSectionReducer()
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
