import React from "react";
import { createSelector } from "reselect";
import createCachedSelector from "re-reselect";
import ItemCard from "../../components/ItemCard/ItemCard";

const getItems = state => state.application.items.listOfItems;

export const itemsCards = createSelector([getItems], items => items);

export const cachedItemsCardSelector = createCachedSelector(
    item => item,
    (item, onClick) => onClick,
    (item, onClick, itemId) => {
        return <ItemCard item={item} onClick={onClick} key={item._id} />;
    }
)((item, onClick, itemId) => itemId);
