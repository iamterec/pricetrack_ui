import React, { Component } from "react";
import "./App.scss";

// Redux
import { connect } from "react-redux";

// React-router
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

// Components
import Authentication from "../Authentication/Authentication";
import Pricetrack from "../Pricetrack/Pricetrack";

const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated
});

class App extends Component {
    render() {
        return (
            <div className="App">
                {!this.props.isAuthenticated ? (
                    <Authentication />
                ) : (
                    <Switch>
                        <Route path="/app" component={Pricetrack} />
                        <Redirect to="/app" />
                    </Switch>
                )}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(App));
