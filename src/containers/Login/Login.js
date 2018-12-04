import React, { Component } from "react";
import "./Login.scss";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
    textFields: {
        width: "300px"
    },
    buttons: {}
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
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
                    <div className="login-button">
                        <Button
                            variant="contained"
                            color="primary"
                            style={styles.buttons}
                            size="large"
                        >
                            Log in
                        </Button>
                    </div>
                </section>
            </main>
        );
    }
}

export default Login;
