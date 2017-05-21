const todo = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            console.log(action);
            return {
                id: action.id,
                text: action.content,
                deadline: action.deadline,
                title: action.title,
                completed: false
            }
        case 'TOGGLE_TODO':
            if (state.id != action.id) return state;
            return Object.assign({}, state, { completed: !action.completed });
        default:
            return state;
    }
}

let initialState = [
    {
        id: 0,
        title: '明天要参加面试',
        deadline: '2016-05-23',
        text: '面试地点在龙阳路地铁站旁边的一家公司，提前半小时到公司填表。',
        completed: false,
        isEditing: false
    }
];

const todos = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            history.go(-1);
            return [
                ...state,
                todo(null, action)
            ]
        case 'TOGGLE_TODO':
            return state.map(todo => {
                todo(todo, action);
            });
        case 'TOGGLE_EDITING':
            console.log(action);
            return state.map((todo) => {
                if (todo.id === action.id)
                    return Object.assign({}, todo, { isEditing: !todo.isEditing })
                return todo;
            });

        default:
            return state;
    }
}

export default todos;