import React, { Component } from "react";
import "./App.scss";

// Redux
import {connect} from "react-redux"

// React-router
import { withRouter } from 'react-router-dom'

import Authentication from "../Authentication/Authentication"

const mapStateToProps = (state) => ({
    isAuthenticated: state.isAuthenticated
})

class App extends Component {
    render() {
        return (
            <div className="App">
                {!this.props.isAuthenticated ? (
                    <Authentication />
                ) : (
                    <div>User is authenticated</div>
                )}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));
