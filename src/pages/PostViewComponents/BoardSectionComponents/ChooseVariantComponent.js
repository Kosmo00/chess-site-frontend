import React, { useState, useEffect, useRef } from 'react'

// react-bootstrap components
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// chess-site components
import VariantComponent from './ChooseVariant/VariantComponent';

const ChooseVariantComponent = ({ variants, setVariantsView, returnVariant }) => {
  const [select, setSelect] = useState(0)

  let ref = useRef(null)

  const acceptsVariant = () => {
    setVariantsView(false)
    returnVariant(variants[select])
  }

  useEffect(() => {
    window.onkeydown = ev => {
      switch (ev.code) {
        case 'Enter':
        case 'ArrowRight':
          setVariantsView(false)
          returnVariant(variants[select])
          break
        case 'ArrowUp':
          if (select > 0) {
            setSelect(select => select - 1)
            if (select >= 2) {
              ref.current.scrollTop = 25 * (select - 2)
            }
          }
          break
        case 'ArrowDown':
          if (select < variants.length - 1) {
            setSelect(select => select + 1)
            if (select >= 2) {
              ref.current.scrollTop = 25 * (select - 2)
            }
          }
          break
        case 'ArrowLeft':
          setVariantsView(false)
          break
        default:
          break
      }
    }
    return () => {
      window.onkeydown = null
    }
  }, [select, variants, setVariantsView, returnVariant, ref])

  return (
    <>
      <Modal scrollable show onHide={() => setVariantsView(false)} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header closeButton>
          <Modal.Title>
            Select Variant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body ref={ref} style={{ height: '150px' }}>
          {buildVariants(variants, select, setSelect)}
        </Modal.Body>
        <Modal.Footer>
          <div className='text-center'>
            <Button className='btn-primary' onClick={() => {
              if (select > 0) {
                setSelect(select - 1)
                if (select >= 2) {
                  ref.current.scrollTop = 25 * (select - 2)
                }
              }
            }}>Up</Button>
            <Button
              className='btn-primary ml-2'
              onClick={() => {
                if (select < variants.length - 1) {
                  setSelect(select + 1)
                  if (select >= 2) {
                    ref.current.scrollTop = 25 * (select - 2)
                  }
                }
              }}
            >Down
            </Button>
          </div>
          <Button className='btn-success' onClick={() => acceptsVariant()}
          >
            Select
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const buildVariants = (variants, selected, setSelect) => {
  let variants_components = []

  for (let i = 0; i < variants.length; i++) {
    let variant_text = ''
    variant_text += variants[i].n_move
    const move_turn = variants[i].getTurnToAnnotate()
    if (move_turn === 1) {
      variant_text += '-'
    }
    else {
      variant_text += '...'
    }
    variant_text += variants[i].move
    variants_components.push(
      <VariantComponent key={variants[i].id} variant={variant_text} selected={selected === i} pos={i} setSelect={setSelect} />
    )
  }
  return variants_components
}

export default React.memo(ChooseVariantComponent)

