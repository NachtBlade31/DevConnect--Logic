import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';



const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;
    // const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    function updateForm(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const formSubmit = async e => {
        e.preventDefault();
        login(email, password);
    };

    //Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i>
                Sign Into Your Account
        </p>
            <form onSubmit={formSubmit} className="form">
                <div className="form-group">
                    <input type="email" placeholder="Email Address" value={email} name="email" required onChange={updateForm} />
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" value={password} required name="password" minLength="12" onChange={updateForm} />
                </div>
                <input type="submit" value="Submit" onClick={formSubmit} className="btn btn-primary" />
            </form>
            <p className="my-1">
                Don't have an Account? <Link to="/register">Sign Up</Link>
            </p>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, { login })(Login)
