import React from "react";
import "./ItemCard.scss";

import { ReactComponent as BaselineImage } from "../../assets/icons/BaselineImage2.svg";

export default function ItemCard(props) {
    return (
        <div
            className="items-card"
            key={props.item._id}
            id={props.item._id}
            onClick={props.onClick.bind(this)}
        >
            {props.item.image ? (
                <img src={props.item.image} alt={props.item.titile} />
            ) : (
                <BaselineImage className="items-card-svg" />
            )}

            <h4>{props.item.title}</h4>
        </div>
    );
}
