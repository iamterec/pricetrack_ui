import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import Particles from "react-particles-js";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import { authentication } from "./containers/Authentication/AuthenticationReducer";
import { createLogger } from "redux-logger"

const rootReducer = authentication;
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

const particlesOptions = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};
ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <React.Fragment>
                <Particles className="particles" params={particlesOptions} />
                <App />
            </React.Fragment>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

serviceWorker.unregister();
