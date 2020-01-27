import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Register() {

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
            console.log("Password Doesnt match")
        } else {

            console.log("success");
            const newUser = {
                name,
                email,
                password
            }
            try {
                const config = {
                    header: {
                        'Content-Type': 'application/json'
                    }
                }
                body = JSON.stringify(newUser)
                const res = await axios.post('/api/users', newUser, config);
                console.log(res.data);
            }
            catch (err) {
                console.error(err.response.data);
            }
        }

    };
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

export default Register
