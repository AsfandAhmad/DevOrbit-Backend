import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import './Navbar.css'; // 🆕 Make sure this file exists

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="nav-links">
      <li>
        <Link to="/profiles"><i className="fas fa-users" /> Developers</Link>
      </li>
      <li>
        <Link to="/posts"><i className="fas fa-clipboard" /> Posts</Link>
      </li>
      <li>
        <Link to="/dashboard"><i className="fas fa-tachometer-alt" /> Dashboard</Link>
      </li>
      <li>
        <button onClick={logout} className="btn-logout" type="button">
          <i className="fas fa-sign-out-alt" /> Logout
        </button>
      </li>
    </ul>
  );


  const guestLinks = (
    <ul className="nav-links">
      <li><Link to="/profiles">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar fancy-navbar">
      <h1 className="logo">
        <Link to="/"><i className="fas fa-code" /> DevOrbit</Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
