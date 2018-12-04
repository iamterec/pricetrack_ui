import React, { Component } from "react";
import "./App.scss";

import Authentication from "../Authentication/Authentication"


class App extends Component {
    render() {
        const isAuthenticated = false;
        return (
            <div className="App">
                {!isAuthenticated ? (
                    <Authentication />
                ) : (
                    <div>User is authenticated</div>
                )}
            </div>
        );
    }
}

export default App;
