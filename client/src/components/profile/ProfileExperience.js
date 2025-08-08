import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
    experience: { company, title, location, from, to, current, description }
}) => {
    return (
        <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
                {current ? 'Present' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p><strong>Position: </strong>{title}</p>
            {location && <p><strong>Location: </strong>{location}</p>}
            {description && <p><strong>Description: </strong>{description}</p>}
        </div>
    );
};

ProfileExperience.propTypes = {
    experience: PropTypes.shape({
        company: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string,
        from: PropTypes.string.isRequired,
        to: PropTypes.string,
        current: PropTypes.bool,
        description: PropTypes.string
    }).isRequired
};

export default ProfileExperience;
