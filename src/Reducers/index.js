import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import themeReducer from './ThemeReducer';
import alertReducer from './AlertReducer';
import tasksReducer from './TasksReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    theme: themeReducer,
    alert: alertReducer,
    tasks: tasksReducer
});

export default rootReducer;