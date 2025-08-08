import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
    if (loading) return null;

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
