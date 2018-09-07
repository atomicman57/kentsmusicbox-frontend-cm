import React, { Component } from "react";
import tokenService from '../../utils/tokenService';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleChange = (field, e) => {
        this.setState({
            [field]: e.target.value
        });
    }

    handleLogin = (e) => {
        e.preventDefault();
        fetch('/api/users/login', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json'
            }),
            body: JSON.stringify(this.state)
        })
        .then(res => {
            return res.json()
            // throw new Error('Error from user service');
        })
        .then(data => {
            console.log("data", data);
            if (data.error) {
                alert(data.error);
                return;
            }
            this.props.handleLogin();
            tokenService.setToken(data.jwt);
            window.location = '/';
    
        })
        .catch(error => {
            console.log(error);
        }) 
    }

    render() {
        return (
        <div class="text-center" class="bigLogin">
            <form className="form-signin">
                        <div>
                            <input 
                            type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus
                            value={this.state.email} onChange={(e) => this.handleChange('email', e)} />
                        </div>


                    <div>

                        <input placeholder="Password"  class="form-control" type="password" value={this.state.password} onChange={(e) => this.handleChange('password', e)} required/>
                    </div>

            <button id="logInButton" className="btn btn-lg btn-primary btn-block" onClick={this.handleLogin}>Log In</button>

            </form>
        </div>
    );
  }
}

export default LoginPage;
