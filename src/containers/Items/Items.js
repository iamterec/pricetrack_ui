import React, { Component } from "react";
import "./Items.scss";
import AddItem from "../AddItem/AddItem";
// redux
import { connect } from "react-redux";
import { getAllItems, showItem } from "./ItemsActions";
import { getItemById } from "../Item/ItemActions";

import { itemsCards, cachedItemsCardSelector } from "./ItemsSelectors";

const mapStateToProps = state => ({
    items: itemsCards(state)
});

const mapDispatchToProps = dispatch => ({
    getAllItems: () => dispatch(getAllItems()),
    showItem: event => dispatch(showItem(event.target.id)),
    getItemById: (id) => dispatch(getItemById(id))
});

class Items extends Component {
    constructor(props) {
        super(props);
        this.openItem = this.openItem.bind(this);
    }

    openItem(event) {
        event.preventDefault();
        this.props.getItemById(event.currentTarget.id)
    }

    componentDidMount() {
        this.props.getAllItems();
    }

    render() {
        console.log("Items: ", this.props.items);
        let items = null;
        if (this.props.items.length !== 0) {
            const func = this.openItem;
            items = this.props.items.map(item => {
                return cachedItemsCardSelector(item, func, item._id);
            });
        }
        return (
            <div className="items-container">
                {items}
                <AddItem />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Items);
