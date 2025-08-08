import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile: {
    bio,
    skills,
    user: { name }
} }) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <>
                    <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
                    <p>{bio}</p>
                    <div className="line"></div>
                </>
            )}
            <h2 className="text-primary">Skill Set</h2>
            <div className="skills">
                {skills && skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <div key={index} className="p-1">
                            <i className="fa fa-check"></i> {skill}
                        </div>
                    ))
                ) : (
                    <p>No skills listed.</p>
                )}
            </div>
        </div>
    );
};

ProfileAbout.propTypes = {
    profile: PropTypes.shape({
        bio: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string).isRequired,
        user: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default ProfileAbout;
