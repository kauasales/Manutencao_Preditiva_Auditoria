import React, { Component } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

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
                    tickAmount: 24, // Define a quantidade de intervalos no eixo x
                    labels: {
                        datetimeFormatter: {
                            hour: 'HH:mm'
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: "Temperatura (°C)"
                    },
                    min: 0, // Define o valor mínimo da escala
                    max: 100, // Define o valor máximo da escala
                    tickAmount: 10 // Define a quantidade de intervalos na escala
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

updateTemperatureData = async () => {
    const { idMaquina } = this.props; // Acessa o idMaquina passado como prop

    try {
        const response = await axios.get(`http://localhost:8000/api/dados/graficoTemperatura/${idMaquina}`);
        const apiData = response.data.map(item => {
            // Assume que 'item.dataHora' está no formato 'YYYY-MM-DD HH:MM:SS'
            const dataHora = item.dataHora;
            // Converte a data e hora para o formato UTC
            const dataObj = new Date(`${dataHora}Z`);
            console.log(dataObj.toISOString());

            if (!isNaN(dataObj.getTime())) {
                return {
                    x: dataObj.getTime(), // Converte a data e hora para o timestamp
                    y: item.valor // Usa o valor da média de temperatura
                };
            } else {
                console.error('Data ou hora em formato inválido:', dataHora);
                return null;
            }
        }).filter(item => item); // Remove quaisquer itens nulos resultantes de datas inválidas

        this.setState({
            series: [{ name: "Temperatura", data: apiData }]
        });
    } catch (error) {
        console.error('Erro ao buscar dados da temperatura:', error);
    }
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