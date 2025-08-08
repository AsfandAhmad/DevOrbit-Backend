import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
    const { id } = useParams();

    useEffect(() => {
        getProfileById(id);
    }, [getProfileById, id]);

    const isOwner =
        auth.isAuthenticated &&
        !auth.loading &&
        auth.user &&
        profile &&
        profile.user &&
        auth.user._id?.toString() === (profile.user._id?.toString?.() || profile.user.toString?.());

    return (
        <section className="profile-container">
            {loading || profile === null ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className="profile-actions">
                        <Link to="/profiles" className="btn btn-light">← Back to Profiles</Link>
                        {isOwner && (
                            <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>
                        )}
                    </div>

                    <div className="profile-grid">
                        <ProfileTop profile={profile} isOwner={isOwner} />
                        <ProfileAbout profile={profile} />

                        <div className="profile-section">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                profile.experience.map((exp) => (
                                    <ProfileExperience key={exp._id} experience={exp} />
                                ))
                            ) : (
                                <h4>No experience listed</h4>
                            )}
                        </div>

                        <div className="profile-section">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                profile.education.map((edu) => (
                                    <ProfileEducation key={edu._id} education={edu} />
                                ))
                            ) : (
                                <h4>No education listed</h4>
                            )}
                        </div>

                        {profile.githubusername && (
                            <div className="profile-section">
                                <ProfileGithub username={profile.githubusername} />
                            </div>
                        )}
                    </div>
                </Fragment>
            )}
        </section>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
