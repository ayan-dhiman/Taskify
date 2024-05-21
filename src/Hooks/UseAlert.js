import { useDispatch } from 'react-redux';

const useAlert = () => {
    const dispatch = useDispatch();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    return alert;
};

export default useAlert;