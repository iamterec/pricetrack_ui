import React from "react";
import { createSelector } from "reselect";

import LinearGraph from "./LinearGraph/LinearGraph"
import DataTable from "./DataTable/DataTable"

export const getCurrentItemData = (state) => state.application.item.currentItem.data;

export const graphSelector = createSelector([getCurrentItemData], data => {
    return Boolean(data) ? <LinearGraph data={data} /> : null
})

export const dataTableSelector = createSelector([getCurrentItemData], data => {
    return Boolean(data) ? (<DataTable data={data.slice(-10)} />) : (null);
})
