import React, { Component } from "react";
import "./AddItem.scss";

// Redux
import { connect } from "react-redux";
import { addItemRequest } from "../Items/ItemsActions";

import { ReactComponent as ControlPoint } from "../../assets/icons/ControlPoint.svg";

const mapDispatchToProps = dispatch => ({
    addItem: () => dispatch(addItemRequest())
});

class AddItem extends Component {
    render() {
        return (
            <div className="add-item" onClick={this.props.addItem}>
                <ControlPoint className="add-item-plus" />
            </div>
        );
    }
}

export default connect(
    undefined,
    mapDispatchToProps
)(AddItem);
