import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {
    const educationList =
        education.length > 0 ? (
            education.map((edu) => (
                <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td className="hide-sm">{edu.degree}</td>
                    <td>
                        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
                        {edu.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                    </td>
                    <td>
                        <button onClick={() => deleteEducation(edu._id)} className="btn btn-danger">
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="4">No education credentials found</td>
            </tr>
        );

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educationList}</tbody>
            </table>
        </Fragment>
    );
};

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    education: state.profile?.profile?.education || []
});

export default connect(mapStateToProps, { deleteEducation })(Education);
