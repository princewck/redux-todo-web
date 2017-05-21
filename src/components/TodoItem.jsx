import React from 'react';
import '../styles/sass/TodoItem';
// import PropTypes from 'prop-types';
export default ({ title, deadline, text, completed, onclick, isEditing }) => {
    return (
        <div className="todo-item" onClick={onclick}>
            <div className="frontface" style={
                isEditing ? {
                    transform: 'rotatex(180deg)'
                } : {
                        transform: 'rotateX(0deg)'
                    }
            }>
                <p><em>{title}</em> </p>
                <p>{text.length > 100 ? text.substring(0, 200) : text}</p>
                <p>
                    <span className="deadline-label">截止:{deadline}</span>
                    <span className="status-label">状态:{completed ? '已完成' : '未完成'}</span>
                </p>
            </div>
            <div className="backface" style={
                isEditing ? {
                    transform: 'rotateX(360deg)'
                } : {
                        transform: 'rotateX(180deg)'
                    }
            }>
                <a>完成</a>
            </div>
        </div>
    )
}