import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import RoutesComponent from './components/routing/Routes';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const AppContent = () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
      <RoutesComponent />
    </Fragment>
  );
};

const App = () => (
  <Provider store={store}>
    <Router>
      <AppContent />
    </Router>
  </Provider>
);

export default App;
