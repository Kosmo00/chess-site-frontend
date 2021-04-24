import React from 'react'
import useResizeAware from 'react-resize-aware'

// react-bootstrap components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import BoardComponent from './BoardSectionComponents/BoardComponent'
import NotationComponent from './BoardSectionComponents/NotationComponent'

const BoardSection = () => {
  const [resizeListener, sizes] = useResizeAware()
  return (
    <Row>
      <Col xs={7}>
        {resizeListener}
        <BoardComponent width={sizes.width} />
      </Col>
      <Col xs={5}>
        <NotationComponent height={sizes.width - 32 - sizes.width % 8} />
      </Col>
    </Row>
  )
}

export default BoardSection
