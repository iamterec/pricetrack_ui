import React, { Component } from "react";
import "./PasswordChange.scss";

import { server_uri } from "../../config";

// MaterialUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class PasswordChange extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            confirmPassword: "",
            message: "",
            error: ""
        };
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
        this.onPasswordChangeSubmit = this.onPasswordChangeSubmit.bind(this);
        this.validateData = this.validateData.bind(this);
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onConfirmPasswordChange(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    validateData() {
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({ error: "Wrong confirm password." });
            setTimeout(() => {
                this.setState({ error: "" });
            }, 5000);
            return false;
        }
        if (this.state.password.length < 3) {
            this.setState({ error: "Password must contain at least 3 chars." });
            setTimeout(() => {
                this.setState({ error: "" });
            }, 5000);
            return false;
        }
        return true;
    }

    changePassword(password, token) {
        const url = server_uri + "/users/password-change";
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ password: password, token: token })
        };

        fetch(url, request)
            .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
            .then(({ data, isOk }) => {
                if (isOk) {
                    console.log(data["msg"]);
                    this.setState({ message: data["msg"] });
                    setTimeout(() => {
                        this.setState({ message: "" });
                    }, 10000);
                } else {
                    console.log(data);
                    this.setState({ error: data["error"] });
                    setTimeout(() => {
                        this.setState({ error: "" });
                    }, 10000);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    onPasswordChangeSubmit() {
        if (this.validateData()) {
            this.changePassword(
                this.state.password,
                this.props.match.params.token
            );
        }
    }

    render() {
        console.log(this.props.match.params.token);
        return (
            <main className="password-change">
                <section>
                    <h3>Change you password</h3>
                    <div>
                        <TextField
                            id="password"
                            label="Your new password"
                            type="password"
                            margin="normal"
                            style={{ width: "300px" }}
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <div>
                        <TextField
                            id="confirm-password"
                            label="Confirm new password"
                            type="password"
                            margin="normal"
                            style={{ width: "300px" }}
                            value={this.state.confirmPassword}
                            onChange={this.onConfirmPasswordChange}
                        />
                    </div>
                    <span
                        className={
                            (this.state.error && "password-change-error") ||
                            (this.state.message && "password-change-message")
                        }
                    >
                        {this.state.error || this.state.message}
                    </span>
                    <div className="password-change-button">
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ marginTop: "15px" }}
                            onClick={this.onPasswordChangeSubmit}
                        >
                            Change password
                        </Button>
                    </div>
                </section>
            </main>
        );
    }
}

export default PasswordChange;
