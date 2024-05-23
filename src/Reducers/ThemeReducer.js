const initialState = { theme: 'dark' };

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                theme: state.theme === 'light' ? 'dark' : 'light'
            };
        default:
            return state;
    }
};

export default themeReducer;