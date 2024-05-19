const initialState = {
    tasks: [],
    teams: [],
    activity: []
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
        case 'SET_ACTIVITY':
            return {
                ...state,
                activity: action.payload
            };
        default:
            return state;
    }
};

export default tasksReducer;
