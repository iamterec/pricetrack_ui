import React, { Component } from "react";
import "./LinearGraph.scss";
import * as d3 from "d3";

// const width = 800;
// const height = 400;
const margin = { top: 10, right: 20, left: 40, bottom: 20 };

class LinearGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            linePath: ""
        };
        this.yAxis = d3.axisLeft();
        this.xAxis = d3.axisBottom();
        this.xGridLines = d3.axisBottom();
        this.yGridLines = d3.axisLeft();
        this.xAxisRef = React.createRef();
        this.yAxisRef = React.createRef();
        this.xGridLinesRef = React.createRef();
        this.yGridLinesRef = React.createRef();
        this.graphContainerRef = React.createRef();
    }

    static getDerivedStateFromProps(props, state) {
        const data = props.data;

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(data, d => new Date(d.timestamp * 1000)))
            .range([margin.left, state.width - margin.right]);
        const [yMin, yMax] = d3.extent(data, d => d.value)

        const yScale = d3
            .scaleLinear()
            // .domain(d3.extent(data, d => d.value))
            .domain([yMin - yMin*0.005, yMax + yMax*0.005])
            .range([state.height - margin.bottom, margin.top]);

        const lineGenerator = d3
            .line()
            .x(d => xScale(new Date(d.timestamp * 1000)))
            .y(d => yScale(d.value));

        const linePath = lineGenerator(data);

        state.xScale = xScale;
        state.yScale = yScale;
        state.linePath = linePath;
        return state;
    }

    componentDidMount() {
        const width = this.graphContainerRef.current.clientWidth;
        this.setState({
            width: width,
            height: width / 2.4
        });
    }
    componentDidUpdate() {
        // Axises
        this.yAxis.scale(this.state.yScale);
        d3.select(this.yAxisRef.current).call(this.yAxis);
        this.xAxis.scale(this.state.xScale);
        d3.select(this.xAxisRef.current).call(this.xAxis);
        // Grid Lines
        this.xGridLines.scale(this.state.xScale).ticks(5);
        console.log("height:", this.state.height);
        console.log("tick size: ", -this.state.height + margin.bottom);
        d3.select(this.xGridLinesRef.current).call(this.xGridLines.tickSize((-this.state.height + margin.bottom + margin.top)).tickFormat(""))
        this.yGridLines.scale(this.state.yScale).ticks(5);
        d3.select(this.yGridLinesRef.current).call(this.yGridLines.tickSize(-this.state.width + margin.left + margin.right).tickFormat(""))
    }

    render() {
        return (
            <div className="graph-container" ref={this.graphContainerRef}>
                <svg width={this.state.width} height={this.state.height}>
                    <path
                        className="graph-line-path"
                        d={this.state.linePath}
                        strokeWidth="2"
                        stroke="#445873"
                        fill="none"
                    />
                    <g
                        ref={this.xAxisRef}
                        strokeWidth="2"
                        transform={`translate(0, ${this.state.height -
                            margin.bottom})`}
                    />
                    <g
                        ref={this.yAxisRef}
                        strokeWidth="2"
                        transform={`translate(${margin.left }, 0)`}
                    />
                    <g ref={this.xGridLinesRef}
                        strokeWidth="0.1"
                        transform={`translate(0, ${this.state.height - margin.bottom})`}
                    />
                    <g ref={this.yGridLinesRef}
                        strokeWidth="0.1"
                        transform={`translate(${margin.left}, 0)`}
                    />
                </svg>
            </div>
        );
    }
}
//<svg width={this.state.width} height={this.state.height}>
export default LinearGraph;
