import React from 'react';
import { addTodo } from '../actions';
import { connect } from 'react-redux';
import '../styles/sass/AddPanel';
import moment from 'moment/moment';
import { Link } from 'react-router-dom';

const AddTodo = ({ dispatch }) => {
    let title, content, deadline;
    return (
        <div className="add-panel">
            <Link to="/">返回</Link>
            <form onSubmit={e => {
                    e.preventDefault();
                    if (!title.value.trim() || !content.value.trim()) 
                        return console.log('请完整填写表单'); 
                    dispatch(addTodo({
                        title: title.value,
                        deadline: deadline.value,
                        content: content.value
                    }));
                    (title.value = '') && (content.value = '');
                }}>
                <h2>add new todo item</h2>
                <div className="input-group">
                    <label>标题:</label>
                    <input type="text" placeholder="请输入标题" ref={node => { title = node; }} />                    
                </div>
                <div className="input-group">
                    <label>计划完成时间:</label>
                    <input type="date" defaultValue={ moment().format('YYYY-MM-DD') }  ref={ node => {deadline = node;} } />
                </div> 
                <div className="input-group">
                    <label>详细:</label>
                    <textarea ref={ node => {content = node} } />
                </div>                                
                <div className="input-group">

                    <input type="submit" value="提交" />
                </div>                                
            </form>
        </div>
    );
}

export default connect()(AddTodo);