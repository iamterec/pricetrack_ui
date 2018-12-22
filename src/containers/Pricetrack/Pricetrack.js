import React, { Component } from "react";
import "./Pricetrack.scss";

import { connect } from "react-redux";

import Items from "../Items/Items";
import Item from "../Item/Item";

const mapStateToProps = state => ({
    isCurrentItemOpen: state.application.item.open
});

class Pricetrack extends Component {
    render() {
        return (
            <div className="pricetrack">
                <header className="pricetrack-header">Welcome</header>
                <main>
                    <section className="items">
                        <Items />
                    </section>
                    {this.props.isCurrentItemOpen && (
                        <section className="item">
                            <Item />
                        </section>
                    )}
                </main>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Pricetrack);
