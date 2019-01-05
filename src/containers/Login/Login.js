import React, { Component } from "react";
import "./Login.scss";

// Redux stuff
import {connect} from "react-redux"
import {showLoginError, loginUser} from "./LoginActions"

// React-router
import { withRouter, Link } from 'react-router-dom'

// MaterialUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Data validation
import { rules } from "./LoginValidation";
import DataValidator from "../../validation";

const LoginWithGoogle = React.lazy(() => import("./LoginWithGoogle/LoginWithGoogle"))

const styles = {
    textFields: {
        width: "300px"
    },
    buttons: {}
};

const mapStateToProps = (state) => ({
    error: state.loginError
})
const mapDispatchToProps = (dispatch) => ({
    loginUser: (identity, password) => dispatch(loginUser(identity, password)),
    showLoginError: (error) => dispatch(showLoginError(error))
})

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: ""
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onButtonSubmit = this.onButtonSubmit.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if(props.error) {
            state.error = props.error
            props.showLoginError("")
        }
        return state
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    showValidationErrors(validation) {
        this.setState({error: validation.email.message})
    }

    validateData() {
        const validation = new DataValidator(rules);
        const data = {
            email: this.state.email,
            password: this.state.password
        };
        return validation.validate(data);
    }

    onButtonSubmit() {
        const validation = this.validateData()
        if(validation.isValid) {
            this.props.loginUser(this.state.email, this.state.password)
        } else {
            this.showValidationErrors(validation)
        }
    }

    render() {
        return (
            <main className="login">
                <section>
                    <div>
                        <TextField
                            id="standard-name"
                            label="E-mail/Username"
                            margin="normal"
                            style={styles.textFields}
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="password"
                            label="Password"
                            margin="normal"
                            style={styles.textFields}
                            type="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <span className="forgot-password"><Link to="/password-reset">Forgot your password?</Link></span>
                    {Boolean(this.state.error) &&
                    <p className="login-error">{this.state.error}</p>
                    }
                    <div className="login-button">
                        <Button
                            variant="contained"
                            color="primary"
                            style={styles.buttons}
                            size="large"
                            onClick={this.onButtonSubmit}
                        >
                            Log in
                        </Button>
                        <React.Suspense fallback={<div>Loadig...</div>}>
                            <LoginWithGoogle />
                        </React.Suspense>
                    </div>
                </section>
            </main>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
