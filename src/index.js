import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

import Particles from "react-particles-js";

// Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import { application } from "./containers/Pricetrack/PricetrackReducer";
import { authentication } from "./containers/Authentication/AuthenticationReducer";

const rootReducer = (state, action) => {
    if(action.type === "CLEAR_STATE") {
        state = undefined
    }
    return combineReducers({authentication, application})(state, action)
}

const logger = createLogger();
const store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, logger)
);

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
