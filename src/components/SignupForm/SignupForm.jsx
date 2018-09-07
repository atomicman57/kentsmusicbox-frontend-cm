import React from 'react';
import {Link} from 'react-router-dom';
import userService from '../../utils/userService';
import tokenService from '../../utils/tokenService';

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
        this.updateName = this.updateName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updatePasswordConfirmation = this.updatePasswordConfirmation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.password !== this.state.password_confirmation) {
            alert('password and password confirmation much match!');
            return;
        }

        fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            this.props.handleSignup();
            tokenService.setToken(data.jwt);
            window.location = '/'
        })

    }

    updateName(e) {
        this.setState({ name: e.target.value });
    }

    updateEmail(e) {
        this.setState({ email: e.target.value });
    }

    updatePassword(e) {
        this.setState({ password: e.target.value });
    }

    updatePasswordConfirmation(e) {
        this.setState({ password_confirmation: e.target.value });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <br/>
                <div>
                    <label>Name</label><br/>
                    <input placeholder="Name" value={this.state.name} onChange={this.updateName} />
                    <br/>
                </div>

                <div>
                    <label>Email</label><br/>
                    <input placeholder="Email" value={this.state.email} onChange={this.updateEmail} />
                    <br/>
                </div>    

                <div>
                    <label>Password</label><br/>
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.updatePassword}/>
                    <br/>
                </div>

                <div>
                     <label>Password Confirmation</label><br/>
                    <input type="password" placeholder="Password Confirmation" value={this.state.password_confirmation} onChange={this.updatePasswordConfirmation} />
                    <br/>
                </div>

                <br/>

                <button id="signUpButton" type="submit">Sign Up</button>
            </form>
        )
    }
}

export default SignUpForm;