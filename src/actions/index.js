import {
  ADD_TODO,
  DELETE_TODO,
  SET_VISIBILITY_FILTER,
  TOGGLE_TODO,
  FILTER_SEARCH,
  THEME_CHANGE,
} from './types'
let nextTodoId = 0
export const addTodo = text => {
  return {
    type: ADD_TODO,
    id: nextTodoId++,
    text,
  }
}

export const deleteTodo = id => {
  return {
    type: DELETE_TODO,
    id,
  }
}

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id,
})

export const setFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter,
})
export const searchFilter = search => ({
  type: FILTER_SEARCH,
  search,
})

export const themeChange = theme => ({
  type: THEME_CHANGE,
  theme,
})
