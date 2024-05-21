const initialState = {
    open: false,
    message: null
};

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_OPEN':
            return {
                ...state,
                open: action.payload
            };
        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
};

export default alertReducer;
