import React, { Component } from "react";
import "./ItemOverview.scss";

// Redux
import { connect } from "react-redux";

// Reselect
import {graphSelector, dataTableSelector} from "../ItemSelectors"

const mapStateToProps = state => ({
    item: state.application.item.currentItem,
    graph: graphSelector(state),
    dataTable: dataTableSelector(state)
});

class ItemOverview extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.item.title}</h2>
                {this.props.graph}
                {this.props.dataTable}
            </div>
        )
    }
}

export default connect(mapStateToProps)(ItemOverview);
