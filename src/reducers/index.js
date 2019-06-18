import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  SHOW_ALL,
  THEME_CHANGE,
} from '../actions/types'

export const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
        },
      ]
    case DELETE_TODO:
      return state.filter(s => action.id !== s.id)
    case TOGGLE_TODO:
      return state.map(
        todo =>
          todo.id === action.id
            ? {...todo, completed: !todo.completed}
            : todo,
      )
    default:
      return state
  }
}

export const filter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export const theme = (state = '#34495e', action) => {
  switch (action.type) {
    case THEME_CHANGE:
      return action.theme
    default:
      return state
  }
}
