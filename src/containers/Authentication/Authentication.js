import React, { Component } from "react";
import "./Authentication.scss";

import { withRouter, Route, Link, Redirect, Switch } from "react-router-dom";

import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import PasswordReset from "../PasswordReset/PasswordReset"
import PasswordChange from "../PasswordChange/PasswordChange"

class Authentication extends Component {
    getNavLinkClass = path => {
        return this.props.location.pathname === path ? "auth-nav-active" : "";
    };

    render() {
        return (
            <div className="autorization">
                <header className="auth-header">
                    <nav className="auth-nav">
                        <ul>
                            <li className={this.getNavLinkClass("/login")}>
                                <Link
                                    to="/login"
                                >
                                    Log in
                                </Link>
                            </li>
                            <li className={this.getNavLinkClass("/signup")}>
                                <Link
                                    to="/signup"
                                >
                                    Sign Up
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/password-reset" component={PasswordReset} />
                    <Route exact path="/password-change/:token" component={PasswordChange} />
                    <Redirect to="/login" />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Authentication);
