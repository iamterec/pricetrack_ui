import React, { Component } from "react";
import "./PasswordReset.scss";

import { server_uri } from "../../config";

// MaterialUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            message: "",
            error: ""
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onGetLinkSubmit = this.onGetLinkSubmit.bind(this);
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    onGetLinkSubmit() {
        const url = server_uri + "/users/password-reset";
        const request = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: this.state.email })
        };

        fetch(url, request)
            .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
            .then(({ data, isOk }) => {
                if (isOk) {
                    this.setState({ message: data["msg"] });
                    setTimeout(() => {
                        this.setState({ message: "" });
                    }, 5000);
                } else {
                    this.setState({ error: data["error"] });
                    setTimeout(() => {
                        this.setState({ error: "" });
                    }, 5000);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <main className="password-reset">
                <section>
                    <h3>Get a link to change your password:</h3>
                    <div>
                        <TextField
                            id="standard-name"
                            label="E-mail"
                            margin="normal"
                            style={{ width: "300px" }}
                            value={this.state.email}
                            onChange={this.onEmailChange}
                        />
                    </div>
                    <span
                        className={
                            (this.state.error && "password-reset-error") ||
                            (this.state.message && "password-reset-message")
                        }
                    >
                        {this.state.error || this.state.message}
                    </span>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            style={{ marginTop: "15px" }}
                            onClick={this.onGetLinkSubmit}
                        >
                            Get Link
                        </Button>
                    </div>
                </section>
            </main>
        );
    }
}

export default PasswordReset;
