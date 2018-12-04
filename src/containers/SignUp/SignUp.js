import React, { Component } from "react";
import "./SignUp.scss";

import { server_uri } from "../../config";

// Material UI components
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Data validation
import { rules } from "./SignUpValidation";
import DataValidator from "../../validation";

const styles = {
    textFields: {
        width: "300px"
    }
};

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            emailError: "",
            passwordError: ""
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onButtonSubmit = this.onButtonSubmit.bind(this);
        this.validateData = this.validateData.bind(this)
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    showValidationErrors(validation) {
        if(validation.email) {
            this.setState({emailError: validation.email.message})
        }
        if(validation.password) {
            this.setState({passwordError: validation.password.message})
        }
    }

    validateData() {
        const confirmationArgs = [this.state.confirmPassword];
        // find password confirmation rule and add confirmation data as args
        rules.find(
            rule => rule.tag === "passwordConfirmation"
        ).args = confirmationArgs;
        const validation = new DataValidator(rules);
        const data = {
            email: this.state.email,
            password: this.state.password
        };

        return validation.validate(data);
    }

    signUpUser(email, password) {
        const url = server_uri + "/users";
        const request = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        };
        fetch(url, request)
            .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
            .then(({ data, isOk }) => {
                if (data["errors"] && !isOk) {
                    const validation = {
                        email:{},
                        password: {}
                    }
                    if (data.errors.email) {
                        validation.email.message = data.errors.email.join(", ");
                    }
                    if (data.errors.password) {
                        validation.password.message = data.errors.password.join(", ");
                    }
                    this.showValidationErrors(validation)
                }
                console.log(data.msg)
            })
            .catch(error => {
                console.log(error);
            });
    }

    onButtonSubmit() {
        const validation = this.validateData()
        if(validation.isValid) {
            console.log("Sending request...")
            this.signUpUser(this.state.email, this.state.password)
        } else {
            this.showValidationErrors(validation)
        }
    }

    render() {
        return (
            <main>
                <section className="signup">
                    <div>
                        <TextField
                            id="standard-name"
                            label="E-mail"
                            margin="normal"
                            helperText={this.state.emailError}
                            error={Boolean(this.state.emailError)}
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
                            helperText={this.state.passwordError}
                            error={Boolean(this.state.passwordError)}
                            type="password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="confirm-password"
                            label="Confirm password"
                            margin="normal"
                            style={styles.textFields}
                            type="password"
                            value={this.state.confirmPassword}
                            onChange={this.onConfirmPasswordChange}
                        />
                    </div>
                    {this.state.error && (
                        <p className="signup-error-msg">{this.state.error}</p>
                    )}
                    <div className="signup-button">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={this.onButtonSubmit}
                        >
                            Sign Up
                        </Button>
                    </div>
                </section>
            </main>
        );
    }
}

export default SignUp;
