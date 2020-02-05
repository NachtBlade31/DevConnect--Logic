import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'


function Register({ setAlert, register, isAuthenticated }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });
    const { name, email, password, password2 } = formData;
    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    function updateForm(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const formSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Password Do Not match", 'danger')

        } else {

            register({ name, email, password });
        }
    };


    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    return (
        <div>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i>
                Create Your Account
        </p>
            <form onSubmit={formSubmit} className="form">
                <div className="form-group">
                    <input type="text" placeholder="Name" value={name} name="name" onChange={updateForm} required />
                </div>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" value={email} name="email" required onChange={updateForm} />
                    <small className="form-text">
                        This site uses Gravatar, so if you want a profile image, use a Gravatar image
                </small>
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password} required name="password" minLength="12" onChange={updateForm} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" value={password2} name="password2" required minLength="12" onChange={updateForm} />
                </div>
                <input type="submit" value="Submit" onClick={formSubmit} className="btn btn-primary" />
            </form>
            <p className="my-1">
                Already have an account ? <Link to="/login">Sign In</Link>
            </p>
        </div>
    )
}

Register.prototype = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
