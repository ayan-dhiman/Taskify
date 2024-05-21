import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import themeReducer from './ThemeReducer';
import alertReducer from './AlertReducer';
import tasksReducer from './TasksReducer';
import activityReducer from './ActivityReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    theme: themeReducer,
    alert: alertReducer,
    tasks: tasksReducer,
    activity: activityReducer
});

export default rootReducer;