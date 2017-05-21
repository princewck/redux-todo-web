let nextTodoId = 0;
export const toggleEditing = (id) => {
    return {
        type: 'TOGGLE_EDITING',
        id: id
    }
}

export const addTodo = ({title, deadline, content}) => {
    let action = {
        type: 'ADD_TODO',
        id: ++nextTodoId,
        title: title,
        deadline: deadline,
        content: content || ''
    };
    return console.log(action), action;
}