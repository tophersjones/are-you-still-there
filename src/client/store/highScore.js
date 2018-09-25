const UPDATE_HIGHSCORE = 'UPDATE_HIGHSCORE'

const updateHighScore = newHighScore => {
  return {
    type: UPDATE_HIGHSCORE,
    newHighScore
  }
}

export const updateHighScoreThunk = newHighScore => {
  return dispatch => {
    const action = updateHighScore(newHighScore)
    dispatch(action)
  }
}

const initialState = {
    highScore: 0
}

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_HIGHSCORE:
      return { ...state, highScore: action.newHighScore}
    default: 
  return state
  }
}