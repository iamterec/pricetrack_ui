import React, { Component } from "react";
import "./Header.scss";
import { server_uri } from "../../config";

// Redux
import { connect } from "react-redux";
import { saveUser } from "./HeaderActions";
import {logOut} from "../Authentication/AuthenticationActions"

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import UserProfile from "../UserProfile/UserProfile";

const mapStateToProps = state => ({
    user: state.application.user
});

const mapDispatchToProps = dispatch => ({
    saveUser: user => dispatch(saveUser(user)),
    logOut: () => dispatch(logOut())
});

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            isProfileOpen: false
        };
        this.onAvatarClick = this.onAvatarClick.bind(this);
        this.onMenuClose = this.onMenuClose.bind(this);
        this.onProfileOpen = this.onProfileOpen.bind(this);
        this.closeProfile = this.closeProfile.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("access_token");
        const url = server_uri + "/users/me";
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken
            }
        };
        fetch(url, request)
            .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
            .then(({ data, isOk }) => {
                if (isOk) {
                    console.log(data);
                    this.props.saveUser(data["user"]);
                } else {
                    console.log("Else", data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    onProfileOpen() {
        this.setState({ isProfileOpen: true });
        this.onMenuClose();
    }
    closeProfile() {
        this.setState({ isProfileOpen: false });
    }

    onAvatarClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    onMenuClose() {
        this.setState({ anchorEl: null });
    }
    onLogout() {
        this.props.logOut()

    }

    render() {
        return (
            <header className="pricetrack-header">
                <div className="pricetrack-header-container">
                    <span>
                        {this.props.user.username || this.props.user.email}
                    </span>
                    <Avatar
                        alt={this.props.user.email}
                        src={this.props.user.avatar}
                        onClick={this.onAvatarClick}
                        className="header-avatar"
                    />
                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.onMenuClose}
                    >
                        <MenuItem onClick={this.onProfileOpen}>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={this.onLogout}>Logout</MenuItem>
                    </Menu>
                    {this.state.isProfileOpen && (
                        <UserProfile closeProfile={this.closeProfile} />
                    )}
                </div>
            </header>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
