import React, {Component, Fragment} from 'react'
// import PropTypes from "prop-types";
import {connect} from 'react-redux'
import {addTodo, deleteTodo, toggleTodo} from '../actions'
import {SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED} from '../actions/types'

class Todo extends Component {
  state = {
    text: '',
    searching: false,
    searchResult: this.props.people,
  }

  handleText = e => {
    this.setState({text: e.target.value})
    if (this.state.searching === true) {
      let search = this.props.todos.filter(todo =>
        todo.text
          .toLowerCase()
          .includes(this.state.text.toLowerCase()),
      )
      this.setState({searchResult: search})
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.searching === false) {
      if (this.state.text.length === 0) return
      this.props.addTodo(this.state.text)
    }
    this.setState({text: ''})
  }
  handleInput = () => {
    if (this.state.searching === true) {
    }
  }
  handleDelete = id => {
    this.props.deleteTodo(id)
  }
  todoClick = id => {
    this.props.toggleTodo(id)
  }
  onSearch = () => {
    this.setState({searching: !this.state.searching})
  }
  render() {
    const {todos} = this.props
    const {text, searching, searchResult} = this.state
    return (
      <Fragment>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={text}
              onChange={this.handleText}
            />
            <button type="submit">Add {todos.length + 1}</button>
            <div>
              <input
                type="checkbox"
                onChange={this.onSearch}
                value={searching}
              />
              Search
            </div>
          </form>
        </div>
        <ul>
          {searching &&
            text.length > 0 &&
            searchResult.map(todo => (
              <li
                key={todo.id}
                onClick={() => this.todoClick(todo.id)}
                style={{
                  textDecoration: todo.completed
                    ? 'line-through'
                    : 'none',
                }}
              >
                {todo.text} {` `}
                <span onClick={() => this.handleDelete(todo.id)}>
                  &times;
                </span>
              </li>
            ))}

          {(searching && text.length > 0) ||
            todos.map(todo => (
              <li
                key={todo.id}
                onClick={() => this.todoClick(todo.id)}
                style={{
                  textDecoration: todo.completed
                    ? 'line-through'
                    : 'none',
                }}
              >
                {todo.text} {` `}
                <span onClick={() => this.handleDelete(todo.id)}>
                  &times;
                </span>
              </li>
            ))}
        </ul>
      </Fragment>
    )
  }
}

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.filter),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    addTodo: text => dispatch(addTodo(text)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    toggleTodo: id => dispatch(toggleTodo(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todo)
