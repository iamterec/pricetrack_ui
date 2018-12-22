import React, { Component } from "react";
import "./ItemOverview.scss";

// Redux
import { connect } from "react-redux";

const mapStateToProps = state => ({
    item: state.application.item.currentItem
});

class ItemOverview extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.item.title}</h2>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ItemOverview);
