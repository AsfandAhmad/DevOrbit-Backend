import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './profileItem.css'; // Assuming you have a CSS file for styling


const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills
    }
}) => {
    return (
        <div className="profile-card">
            <div className="profile-left">
                <img src={avatar} alt={`${name}'s avatar`} className="avatar" />
            </div>
            <div className="profile-center">
                <h2>{name}</h2>
                <p>{status} {company && <span>at {company}</span>}</p>
                <p>{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn-profile">
                    <i className="fas fa-user"></i> View Profile
                </Link>
            </div>
            <div className="profile-right">
                <ul>
                    {skills.slice(0, 4).map((skill, index) => (
                        <li key={index}><i className="fas fa-check text-primary"></i> {skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;
