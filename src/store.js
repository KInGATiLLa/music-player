import {combineReducers, createStore} from 'redux'
import {todos, filter, theme} from './reducers'

const reducers = combineReducers({
  todos,
  filter,
  theme,
})

export const store = createStore(reducers)
