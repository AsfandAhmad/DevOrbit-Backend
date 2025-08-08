import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        // Apply token to every request header
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        // Delete the auth header if no token is provided
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;