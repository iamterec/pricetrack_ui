import React, { Component } from "react";
import "./LoginWithGoogle.scss";
import GoogleLogo from "../../../assets/icons/btn_google_light_normal_ios.svg";

// Redux
import { connect } from "react-redux";
import {loginWithGoogleToken} from "../../Authentication/AuthenticationActions"

const mapDispatchToProps = dispatch => ({
    loginWithGoogleToken: (google_token) => dispatch(loginWithGoogleToken(google_token))
})

class LoginWithGoogle extends Component {
    constructor(props) {
        super(props);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    loadGAPI() {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";
        document.body.appendChild(script);
        // script.onload = () => {
        //     console.log("GAPI: ", window.gapi);
        // };
    }

    onButtonClick() {
        console.log("Token is: ", window.gapi.client.getToken());
        let GoogleAuth;
        window.gapi.client
            .init({
                apiKey: "pricetrack-1",
                clientId:
                    "944091863650-5b49d3789fjbg008d4pu20lnn7jh8ren.apps.googleusercontent.com",
                scope: "https://www.googleapis.com/auth/userinfo.profile"
            })
            .then(() => {
                GoogleAuth = window.gapi.auth2.getAuthInstance();

                // Listen for sign-in state changes.
                GoogleAuth.isSignedIn.listen((arg) => {
                    console.log("You signed in in google");
                });
                GoogleAuth.signIn();
                return window.gapi.client.getToken()
            })
            .then((token) => {
                this.props.loginWithGoogleToken(token)
            })
    }

    componentDidMount() {
        this.loadGAPI();
    }

    render() {
        return (
            <div className="login-with-google">
                <div
                    className="login-with-google-btn"
                    onClick={this.onButtonClick}
                >
                    <img src={GoogleLogo} alt="" />
                    <span>Sign in with Google</span>
                </div>
            </div>
        );
    }
}

export default connect(undefined, mapDispatchToProps)(LoginWithGoogle);
