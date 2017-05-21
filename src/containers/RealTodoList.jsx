import TodoList from '../components/TodoList';
import { connect } from 'react-redux';
import { toggleEditing } from '../actions';


const getVisibleTodos = function(todos, filter) {
    switch (filter) {
        case 'ALL':
            return todos;
        case 'FINISHED':
            return todos.filter((todo) => todo.completed);
        case 'NOT_FINISHED':
            return todos.filter((todo) => !todo.completed);
        default: 
            return todos;
    }
}

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.filter)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onItemClick: (id) => {
            dispatch( toggleEditing(id));
        }
    }
};

const RealTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);

export default RealTodoList;