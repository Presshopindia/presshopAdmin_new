import React from "react";
import ReactApexChart from "react-apexcharts";
import PropTypes from "prop-types";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  render() {
    return (
      <ReactApexChart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='line'
        width='100%'
        height='100%'
      />
    );
  }
}

LineChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired, // Series data for the chart
  chartOptions: PropTypes.object.isRequired, // Chart configuration options
};

export default LineChart;
