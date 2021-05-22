import React, { useEffect, useState } from 'react'
import useResizeAware from 'react-resize-aware'

// react-bootstrap components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import BoardComponent from './BoardSectionComponents/BoardComponent'
import NotationComponent from './BoardSectionComponents/NotationComponent'
import ChooseVariantComponent from './BoardSectionComponents/ChooseVariantComponent';

// chess-site reducers
import useBoardReducer from './BoardSectionHooks/useBoardReducer'

export const BoardContext = React.createContext()

const BoardSection = () => {
  const [resizeListener, sizes] = useResizeAware()
  const { boardState, boardDispatch } = useBoardReducer()

  const [variantsView, setVariantsView] = useState(false)

  useEffect(() => {
    const isPosibleNextMove = () => {
      return boardState.cursor.children_array !== undefined && boardState.cursor.children_array.length > 0
    }
    window.onkeydown = ev => {
      if (ev.code === 'ArrowLeft' && boardState.cursor.parent !== null) {
        boardDispatch({ type: 'change cursor', value: boardState.cursor.parent })
      }
      if (ev.code === 'ArrowRight' && isPosibleNextMove()) {
        if (boardState.cursor.children_array.length === 1) {
          boardDispatch({ type: 'change cursor', value: boardState.cursor.children_array[0] })
        }
        else {
          setVariantsView(true)
        }
      }
    }
    window.onwheel = ev => {
      ev.preventDefault()
      if (ev.deltaY < 0 && boardState.cursor.parent !== null){
        boardDispatch({ type: 'change cursor', value: boardState.cursor.parent })
      }
      if (ev.deltaY > 0 && isPosibleNextMove()){
        boardDispatch({ type: 'change cursor', value: boardState.cursor.children_array[0] })
      }
    }
    return () => {
      window.onkeydown = null
      window.onwheel = null
    }
  }, [boardState, boardDispatch])

  const setVariantInState = (selected_variant) => {
    boardDispatch({ type: 'change cursor', value: selected_variant })
  }
  return (
    <Row>
      <BoardContext.Provider value={{ boardState: boardState, boardDispatch: boardDispatch }}>
        {variantsView &&
          <ChooseVariantComponent
            setVariantsView={setVariantsView}
            returnVariant={setVariantInState}
            variants={boardState.cursor.children_array}
          />}
        <Col
          xs={7}
          style={{
            height: Math.min(window.innerHeight - window.innerHeight / 6, sizes.width),
            marginRight: - (sizes.width - sizes.height)
          }}
        >
          {resizeListener}
          <BoardComponent width={Math.min(sizes.width, sizes.height)} boardState={boardState} />
        </Col>
        <Col xs={5}>
          <NotationComponent height={Math.min(sizes.width, sizes.height)} />
        </Col>
      </BoardContext.Provider>
    </Row>
  )
}

export default BoardSection
