import React from 'react'

const VariantComponent = ({ variant, selected, pos, setSelect }) => {
  return (
    <div
      style={{
        backgroundColor: selected ? 'black' : '',
        color: selected ? 'white' : 'black',
        height: '25px'
      }}
      onClick={() => { setSelect(pos) }}
    >
      {variant}
    </div>
  )
}

export default React.memo(VariantComponent)
