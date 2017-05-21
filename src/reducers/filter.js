const filter = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SWITCH_VIEW':
            console.log(action);
            if (['ALL', 'FINISHED', 'NOT_FINISHED'].indexOf(action.filter) < 0) {
                return state;
            }
            return action.filter;
        default: 
            return state;
    }
}

export default filter;