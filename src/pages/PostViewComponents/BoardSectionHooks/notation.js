/**
 * 
 * 
 */
const notation = {
  insertMove: (state, new_square) => {

  },
  overwriteMove: (state, new_square) => {

  },
  insertVariant: (state, new_square) => {

  },
  deleteVariant: (state, new_square) => {

  },
  realizeMovement: (state, new_square) => {

  },
  goBackMovement: (state) => {

  },
  goToMovement: (state) => {

  },
  generateFen: (state) => {

  }
}

/**
 * Iterate all the squares and check if more than one piece of same type can ocupate the new square
 * 
 * @param {object} state state of the board
 * @param {array} new_square array with the coordinates of a new square
 * 
 * @returns {boolean} 
 */
const comprobateAccesibility = (state, new_square) => {
  const { pieces_colocation, selected_piece } = state
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (new_square[0] === i && new_square[1] === j) {
        continue;
      }
      if (pieces_colocation[i][j] === pieces_colocation[selected_piece[0]][selected_piece[1]]) {
        return true
      }
    }
  }
  return false
}

export default notation