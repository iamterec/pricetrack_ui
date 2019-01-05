import React, { Component } from "react";
import "./UserProfile.scss";

import { ReactComponent as Close } from "../../assets/icons/Close.svg";

// Redux
import { connect } from "react-redux";
import { saveUser } from "../Header/HeaderActions";
import {onUsernameChange, onAvatarChange, saveUserProfile} from "./UserProfileActions"

// Material UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Modal from "../Modal/Modal";

const mapStateToProps = state => ({
    user: state.application.user
});

const mapDispatchToProps = dispatch => ({
    saveUser: user => dispatch(saveUser(user)),
    onUsernameChange: event => dispatch(onUsernameChange(event.target.value)),
    onAvatarChange: event => dispatch(onAvatarChange(event.target.value)),
    onSaveButtonSubmit: () => dispatch(saveUserProfile())
});

class UserProfile extends Component {
    render() {
        const { user } = this.props;
        const styles = {
            input: {
                width: "360px"
            }
        };
        return (
            <Modal>
                <div className="user-profile">
                    <div className="user-profile-header">
                        <h3>{user.username || user.email}</h3>
                        <Close
                            className="user-profile-close"
                            onClick={this.props.closeProfile}
                        />
                    </div>

                    <div className="user-profile-content">
                        <Avatar
                            alt={user.email}
                            src={user.avatar}
                            className="profile-avatar"
                        />

                        <div className="profile-inputs">
                            <TextField
                                id="profile-username"
                                label="Username"
                                style={styles.input}
                                value={user.username}
                                onChange={this.props.onUsernameChange}
                            />
                            <TextField
                                id="avatar"
                                label="Avatar"
                                margin="normal"
                                style={styles.input}
                                value={user.avatar}
                                onChange={this.props.onAvatarChange}
                            />
                        </div>
                    </div>

                    <div className="profile-buttons">
                        <Button
                            className="save-button"
                            variant="contained"
                            color="primary"
                            onClick={this.props.onSaveButtonSubmit}
                        >
                            Save changes
                        </Button>
                        <Button
                            className="delete-button"
                            variant="outlined"
                            color="secondary"
                            onClick={this.props.closeProfile}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfile);
