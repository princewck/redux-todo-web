import React from 'react';
import '../styles/sass/TodoList';
import Todo from './TodoItem';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
export default ({ todos, onItemClick }) => {
    return (
        <div className="todo-list">
            <h2>任务列表 <Link className="add-new-todo" to="/add">添加</Link></h2>
            {
                todos.map((todo) => {
                    console.log(todo);
                    return <Todo
                        key={todo.id}
                        { ...todo }
                        onclick={() => onItemClick(todo.id)}
                    />
                })
            }
        </div>
    );
}