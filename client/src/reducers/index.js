import { combineReducers } from "redux";
import alert from './alert'; // Assuming you have an alert reducer
import auth from './auth'; // Assuming you have an auth reducer
import profile from './profile'; // Assuming you have a profile reducer
import post from './post'; // Assuming you have a post reducer
export default combineReducers({
    alert, // Add your alert reducer here
    // You can add other reducers here as needed
    auth, // Add your auth reducer here
    profile, // Add your profile reducer here,
    post, // Add your post reducer here

});