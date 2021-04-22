import React, { useEffect, useState } from 'react'

// react-bootstrap components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// chess-site components
import Commentary from './CommentariesSectionComponents/Commentary'

const CommentariesSection = ({ commentaries }) => {

  const [commentariesTree, setCommentariesTree] = useState([])

  useEffect(() => {
    setCommentariesTree(createCommentariesTree(commentaries))
  }, [commentaries])

  return (
    <section className='mt-5' id='comentaries'>
      <Row className='justify-content-center'>
        <Col xs='10' lg='12'>
          <h4>Comentarios</h4>
        </Col>
      </Row>
      {creatingCommentariesTags(commentariesTree)}
    </section>
  )
}

// Iterate all commentaries
const createCommentariesTree = (commentaries) => {
  for (let i = 0; i < commentaries.length; i++) {
    if (commentaries[i]) {
      commentaries[i].referenced = addingNodesToTree(commentaries, i)
    }
  }
  return commentaries
}

// Recursive function to build a commentaries tree
const addingNodesToTree = (commentaries, pos) => {
  let referenced = null
  for (let i = commentaries.length - 1; i > pos; i--) {
    if (commentaries[i] && commentaries[i].reference_to === commentaries[pos].id) {
      const newTree = commentaries[i]
      newTree.referenced = addingNodesToTree(commentaries, i)
      if (!referenced) {
        referenced = []
        referenced[0] = newTree
      }
      else {
        referenced.push(newTree)
      }

      commentaries[i] = null
    }
  }
  return referenced
}

// Recursive function. This becomes visual all commentaries's trees
const creatingCommentariesTags = (commentaries, margin_left) => {
  return (
    <>
      {commentaries.map(commentary => {
        if (commentary !== null) {
          return (
            <Commentary key={commentary.id} {...commentary} margin_left={margin_left} >
              {commentary.referenced && creatingCommentariesTags(commentary.referenced, 5)}
            </Commentary>
          )
        }
        return null
      })}
    </>
  )
}

export default CommentariesSection

