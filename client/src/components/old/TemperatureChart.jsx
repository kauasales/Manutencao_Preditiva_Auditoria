import React, { Component } from "react";
import Chart from "react-apexcharts";

class TemperatureChart extends Component {
 constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "temperature",
          height: 600,
          width: '130%',
          background: '#fff'
        },
        xaxis: {
          type: 'datetime',
          labels: {
            datetimeFormatter: {
              hour: 'HH:mm'
            }
          }
        },
        yaxis: {
          title: {
            text: "Temperatura (°C)"
          }
        },
        stroke: {
          width: 2,
          curve: 'smooth',
        },
        colors: ['#FF4560'],
      },
      series: [
        {
          name: "Temperatura",
          data: [] // Inicialmente vazio, será preenchido dinamicamente
        }
      ]
    };
 }

 componentDidMount() {
    this.updateTemperatureData();
    this.interval = setInterval(() => this.updateTemperatureData(), 30000); // Atualiza a cada 30 segundos
 }

 componentWillUnmount() {
    clearInterval(this.interval); // Limpa o intervalo quando o componente é desmontado
 }

 updateTemperatureData = () => {
    const hourlyData = Array.from({length: 24}, (_, i) => {
      const date = new Date();
      date.setHours(i);
      return {
        x: date.getTime(),
        y: Math.floor(Math.random() * 50) + 10 // Gera temperatura aleatória
      };
    });

    this.setState({
      series: [
        {
          name: "Temperatura",
          data: hourlyData
        }
      ]
    });
 }

 render() {
    return (
      <div className="temperature-chart">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="line"
          width="100%"
          height={500}
        />
      </div>
    );
 }
}

export default TemperatureChart;
