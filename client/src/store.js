import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// This code sets up a Redux store for a MERN stack application, applying middleware and enabling
// Redux DevTools for debugging. It imports necessary functions from Redux and Redux DevTools,
// initializes the store with an empty initial state, and applies thunk middleware for handling
// asynchronous actions. The rootReducer is imported from a separate file, which combines all the
// reducers for the application. The store is then exported for use in the application, allowing
// components to connect to the Redux state and dispatch actions. This setup is essential for managing
// the application's state in a predictable manner, especially in a complex application like a MERN stack
// project where multiple components may need to share and update state. The use of thunk middleware
// allows for asynchronous actions, such as API calls, to be dispatched, making it easier to
// handle side effects in the application. The composeWithDevTools function enhances the store with
// debugging capabilities, allowing developers to inspect actions and state changes in real-time during development.