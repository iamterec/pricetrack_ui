import React, { Component } from "react";
import "./Item.scss";
import { ReactComponent as Close } from "../../assets/icons/Close.svg";

import ItemOverview from "./ItemOverview/ItemOverview";
import ItemPreferences from "./ItemPreferences/ItemPreferences";

// Material UI
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";

// Redux
import { closeCurrentItem } from "./ItemActions";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    item: state.application.item.currentItem
});
const mapDispatchToProps = dispatch => ({
    closeCurrentItem: () => dispatch(closeCurrentItem())
});

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0
        };
        this.onTabChange = this.onTabChange.bind(this);
    }
    onTabChange(event, value) {
        this.setState({ tab: value });
    }

    render() {
        return (
            <div className="item-container">
                <div className="item-header-buttons">
                    <AppBar position="relative">
                        <Tabs
                            value={this.state.tab}
                            onChange={this.onTabChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Overview" />
                            <Tab label="Preferences" />
                        </Tabs>
                        <Close
                            className="current-item-close"
                            onClick={this.props.closeCurrentItem}
                        />
                    </AppBar>
                </div>
                {this.state.tab === 0 && <ItemOverview />}
                {this.state.tab === 1 && <ItemPreferences />}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Item);

// <Button variant="contained" color="primary">Save changes</Button>
// <Button variant="outlined" color="secondary">Delete</Button>
