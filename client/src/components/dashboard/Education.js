import React from 'react';
import { connect } from 'react-redux';
import Moments from 'react-moment';
import PropTypes from 'prop-types';
import { deleteEducation } from '../../actions/profile';

const Education = ({ education, deleteEducation }) => {

    const educations = education.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className='hide-sm'> {edu.degree}</td>
            <td>
                <Moments format='YYYY/MM/DD'>{edu.from}</Moments>-{
                    edu.to === null ? ('Now') : (<Moments format='YYYY/MM/DD'>{edu.to}</Moments>)
                }
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>Delete</button>
            </td>
        </tr>

    ))
    return (
        <div>
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
                <tbody>{educations}</tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education)
