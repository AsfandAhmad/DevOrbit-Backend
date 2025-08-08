import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { login } from '../../actions/auth'; // Import the login action
// import { setAlert } from '../../actions/alert'; // Uncomment if you have an alert
// import axios from 'axios';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
    // const newUser = { name, email, password };

    // try {
    //   const config = {
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   };
    //   const body = JSON.stringify(newUser);
    //   const res = await axios.post('/api/users', body, config);
    //   console.log(res.data); // Handle success (e.g., show message or redirect)
    // } catch (err) {
    //   console.error(err.response.data); // Handle error
    // }
  };

  // Redirect if authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />; // Redirect to home page if authenticated
  }

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign in to Your Account</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool // You can add more prop types if needed
  // setAlert: PropTypes.func.isRequired // Uncomment if you have an alert reducer
};

const mapStateToProps = State => ({
  isAuthenticated: State.auth.isAuthenticated // You can map state to props if needed
  // alert: state.alert // Uncomment if you have an alert reducer
  // You can map state to props if needed
});
export default connect(mapStateToProps, { login })(Login);
