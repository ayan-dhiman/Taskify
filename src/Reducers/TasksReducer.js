const initialState = {
    tasks: [],
    teams: []
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload
            };
        case 'SET_TEAMS':
            return {
                ...state,
                teams: action.payload
            };
        default:
            return state;
    }
};

export default tasksReducer;
