import React, { Component } from "react";
import "./ItemPreferences.scss";

// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";

// Redux
import { connect } from "react-redux";
import {
    onItemTitleChange,
    onItemImageChange,
    onItemPageUrlChange,
    onItemCssSelectorChange,
    onItemAttributeNameChange,
    onItemTrackingChange,
    onSaveButtonSubmit,
    onDeleteButtonSubmit
} from "../ItemActions";

const mapStateToProps = state => ({
    item: state.application.item.currentItem
});

const mapDispatchToProps = dispatch => ({
    onItemTitleChange: event => dispatch(onItemTitleChange(event.target.value)),
    onItemImageChange: event => dispatch(onItemImageChange(event.target.value)),
    onItemPageUrlChange: event =>
        dispatch(onItemPageUrlChange(event.target.value)),
    onItemCssSelectorChange: event =>
        dispatch(onItemCssSelectorChange(event.target.value)),
    onItemAttributeNameChange: event =>
        dispatch(onItemAttributeNameChange(event.target.value)),
    onItemTrackingChange: event => dispatch(onItemTrackingChange(event.target.checked)),
    onSaveButtonSubmit: () => dispatch(onSaveButtonSubmit()),
    onDeleteButtonSubmit: () => dispatch(onDeleteButtonSubmit())
});

class ItemPreferences extends Component {
    render() {
        const trackingMessage = this.props.item.tracking.message
        return (
            <div className="item-pref">
                <div className="item-pref-img-title">
                    <img src={this.props.item.image} alt=""/>
                    <div className="item-pref-img-title-inputs">
                        <div>
                            <TextField
                                id="item-title"
                                label="Title"
                                margin="normal"
                                fullWidth
                                value={this.props.item.title}
                                onChange={this.props.onItemTitleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                id="item-image-url"
                                label="Image URL"
                                margin="normal"
                                value={this.props.item.image}
                                fullWidth
                                onChange={this.props.onItemImageChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <TextField
                        id="item-page-url"
                        label="Page URL"
                        margin="normal"
                        fullWidth
                        value={this.props.item.page_url}
                        onChange={this.props.onItemPageUrlChange}
                    />
                    <div className="item-pref-selector">
                        <TextField
                            id="item-css-selector"
                            label="CSS selector"
                            margin="normal"
                            value={this.props.item.css_selector}
                            onChange={this.props.onItemCssSelectorChange}
                        />
                        <TextField
                            id="item-attribute-name"
                            label="Attribute name(optional)"
                            margin="normal"
                            value={this.props.item.attribute_name}
                            onChange={this.props.onItemAttributeNameChange}
                        />
                        <div className="item-tracking">
                            <div className="item-tracking-checkbox">
                                Tracking:
                                <Checkbox
                                    checked={this.props.item.tracking.status === "tracking"}
                                    onChange={this.props.onItemTrackingChange}
                                    value="tracking"
                                    color="primary"
                                />
                            </div>
                            {Boolean(trackingMessage) && (
                                <span className="item-tracking-message">{trackingMessage}</span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="item-pref-buttons">
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
                        onClick={this.props.onDeleteButtonSubmit}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemPreferences);
