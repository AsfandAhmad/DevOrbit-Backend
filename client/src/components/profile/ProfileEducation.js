import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ education }) => {
    if (!education) return null;

    const { school, degree, fieldofstudy, from, to, current, description } = education;

    return (
        <div>
            <h3 className="text-dark">{school}</h3>
            <p>
                <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
                {current ? 'Present' : <Moment format="YYYY/MM/DD">{to}</Moment>}
            </p>
            <p><strong>Degree: </strong>{degree}</p>
            <p><strong>Field of Study: </strong>{fieldofstudy}</p>
            {description && <p><strong>Description: </strong>{description}</p>}
        </div>
    );
};

ProfileEducation.propTypes = {
    education: PropTypes.shape({
        school: PropTypes.string.isRequired,
        degree: PropTypes.string.isRequired,
        fieldofstudy: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string,
        current: PropTypes.bool,
        description: PropTypes.string
    }).isRequired
};

export default ProfileEducation;
