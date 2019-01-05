import React, { Component } from "react";
import "./DataTable.scss";

function formatDate(date, dateSeparator = "/") {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const time = Math.floor(hours / 12) ? hours + "AM" : (hours % 12) + "PM";
    // console.log("time is: ", time);
    return time + " " + day + dateSeparator + month + dateSeparator + year;
}

class DataTable extends Component {
    render() {
        const rows = this.props.data.reverse().map(row => {
            return (
                <tr key={row.timestamp}>
                    <td className="data-table-date">{formatDate(new Date(row.timestamp * 1000))}</td>
                    <td className="data-table-value">{row.value}</td>
                </tr>
            );
        });
        return (
            <div className="data-table">
                <table>
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>VALUE</th>
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        );
    }
}

export default DataTable;
