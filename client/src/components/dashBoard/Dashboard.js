import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './dashboardactions';
import Experiences from './Experiences';
import Education from './Education';

const Dashboard = ({
    getCurrentProfile,
    auth: { user, loading: authLoading },
    profile: { profile, loading: profileLoading },
    deleteAccount
}) => {
    useEffect(() => {
        if (!authLoading) {
            getCurrentProfile();
        }
    }, [authLoading, getCurrentProfile]);

    if (authLoading || profileLoading) {
        return <Spinner />;
    }

    return (
        <Fragment>
            <div className="dashboard-container">
                <h1 className="dashboard-title">Dashboard</h1>
                {user && (
                    <p className="dashboard-welcome">
                        <i className="fas fa-user" /> Welcome {user.name}
                    </p>
                )}

                {profile ? (
                    <Fragment>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <DashboardActions />
                        </div>

                        <div
                            className="dashboard-sections"
                            style={{
                                backgroundColor: '#1e1e1e',
                                padding: '2rem',
                                borderRadius: '10px',
                                boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                                marginTop: '2rem',
                                color: '#fff',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',

                            }}
                        >
                            <Experiences experience={profile.experience} />
                            <Education education={profile.education} />
                        </div>


                        <div className="dashboard-delete">
                            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-circle text-primary" /> Delete My Account
                            </button>
                        </div>
                    </Fragment>
                ) : (
                    <div className="dashboard-empty">
                        <p>You have not yet created a profile. Please add some information.</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </div>
                )}
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
