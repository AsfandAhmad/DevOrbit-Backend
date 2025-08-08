import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ experience, deleteExperience }) => {
    const experienceList =
        experience.length > 0 ? (
            experience.map((exp) => (
                <tr key={exp._id}>
                    <td>{exp.company}</td>
                    <td className="hide-sm">{exp.title}</td>
                    <td>
                        <Moment format="YYYY/MM/DD">{exp.from}</Moment> –{' '}
                        {exp.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                    </td>
                    <td>
                        <button
                            onClick={() => deleteExperience(exp._id)}
                            className="btn btn-danger btn-sm"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>No experience credentials found</td>
            </tr>
        );

    return (
        <Fragment>
            <h2 className="section-title">Experience Credentials</h2>
            <div className="table-container">
                <table className="table experience-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th className="hide-sm">Title</th>
                            <th className="hide-sm">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{experienceList}</tbody>
                </table>
            </div>
        </Fragment>
    );
};

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    experience: state.profile?.profile?.experience || []
});

export default connect(mapStateToProps, { deleteExperience })(Experience);
