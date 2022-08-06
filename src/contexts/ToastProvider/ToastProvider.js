import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { actions } from "../../utils/actions";
import getId from "../../utils/getId";

const { ADD_TOAST, REMOVE_TOAST } = actions;
const ToastContext = createContext();

// create a action creators

// set up and array of toasts
// give them different ids
// add toast, remove toast
// toast must be removed after 3 seconds

// set up portal
// make a flexible container whose width is fixed in desktop mode and in mobile mode it take 100vw

// setup varients for the toast
// two classes that applied to toast based on the variant

// model for the toast
// id, text, type(success, error),

const initialState = { toasts: [] };

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TOAST:
      const toast = {
        id: getId(),
        text: action.payload.toast.text,
        type: action.payload.toast.type,
      };
      return { ...state, toasts: state.toasts.concat(toast) };
    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((toast) => {
          return toast.id !== action.payload.id;
        }),
      };
    default:
      return state;
  }
}

const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
      setToastMsg("");
    }, 3000);
    return () => clearTimeout(timer);
  });

  const addToast = useCallback((text, type) => {
    return dispatch({ type: ADD_TOAST, payload: { toast: { text, type } } });
  }, []);

  const removeToast = useCallback(
    (id) => dispatch({ type: REMOVE_TOAST, payload: { id } }),
    []
  );

  // const removeToast = (id) => dispatch({ type: REMOVE_TOAST, payload: { id } });

  const setupToast = (message) => {
    setShowToast(true);
    setToastMsg(message);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        toastMsg,
        setupToast,
        setShowToast,
        dispatch,
        addToast,
        removeToast,
        ...state,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastProvider, useToast };
