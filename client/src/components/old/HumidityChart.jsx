import React, { Component } from "react";
import Chart from "react-apexcharts";

class HumidityChart extends Component {
 constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "humidity",
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
            text: "Umidade (%)"
          }
        },
        stroke: {
          width: 2,
          curve: 'smooth',
        }
      },
      series: [
        {
          name: "Umidade",
          data: [] // Inicialmente vazio, será preenchido dinamicamente
        }
      ]
    };
 }

 componentDidMount() {
    this.updateHumidityData();
    this.interval = setInterval(() => this.updateHumidityData(), 30000); // Atualiza a cada 30 segundos
 }

 componentWillUnmount() {
    clearInterval(this.interval); // Limpa o intervalo quando o componente é desmontado
 }

 updateHumidityData = () => {
    const hourlyData = Array.from({length: 24}, (_, i) => {
      const date = new Date();
      date.setHours(i);
      return {
        x: date.getTime(),
        y: Math.floor(Math.random() * 100) // Gera umidade aleatória
      };
    });

    this.setState({
      series: [
        {
          name: "Umidade",
          data: hourlyData
        }
      ]
    });
 }

 render() {
    return (
      <div className="humidity-chart">
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

export default HumidityChart;
