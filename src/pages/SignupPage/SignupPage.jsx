import React from 'react';
import SignupForm from '../../components/SignupForm/SignupForm';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { message: '' }

        this.updateMessage = this.updateMessage.bind(this);
    }

    updateMessage(msg) {
        this.setState({ message: msg });
    }

    render() {
        return(
          <div className="SignupPage">
            <SignupForm 
                {...this.props}
                updateMessage={this.updateMessage}
                handleSignup={this.props.handleSignup}
            />

            <p>{this.state.message}</p>
          </div>
        )
    }

}

export default SignupPage;