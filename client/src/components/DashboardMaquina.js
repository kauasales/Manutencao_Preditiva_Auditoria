import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TemperatureChart from './TemperatureChart';
import HumidityChart from './HumidityChart';
import Dashboard from './Dashboard';
import FormularioMaquina from './FormularioMaquina';

const DashboardMaquina = () => {
    const { idMaquina } = useParams();
    const [maquina, setMaquina] = useState(null);

    useEffect(() => {
        // Função para carregar os detalhes da máquina do banco de dados
        const fetchMachineDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/maquinas/${idMaquina}`);
                setMaquina(response.data); // Atualiza o estado com os detalhes da máquina recebidos
            } catch (error) {
                console.error('Erro ao buscar detalhes da máquina:', error);
            }
        };

        fetchMachineDetails();
    }, [idMaquina]); // Dependência para o useEffect

    // Corrigindo a definição do estado para a imagem
    const [imagem] = useState('/assets/img/Planta.png');

    return (
        <div className="dashboard-container">
            {/* Verifique se 'maquina' não é null antes de tentar acessar suas propriedades */}
            {maquina ? (
                <>
                    <div className="dashboard-header">
                        <h1>Home / Visão Geral / Setor X / {maquina.nome}</h1>
                        <h2>{maquina.nome}</h2>
                    </div>

                    <div className='dashboard-maquina'>
                        {/* Máquina */}
                        <FormularioMaquina
                            maquina={maquina}
                            readOnly={true}
                        />

                        {/* Vista Superior */}
                        <div className="formulario-planta">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Vista Superior</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="planta-container">
                                            {imagem && (
                                                <div className="imagem-preview">
                                                    <img src={imagem} alt="Planta" />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Gráficos - Gauge*/}
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Sensores</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <Dashboard idMaquina={idMaquina}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Gráficos - Temperatura*/}
                    <table>
                        <thead>
                            <tr>
                                <th>Indicativos de Temperatura</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <TemperatureChart idMaquina={idMaquina}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Gráficos - Umidade*/}
                    <table>
                        <thead>
                            <tr>
                                <th>Indicativos de Umidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <HumidityChart idMaquina={idMaquina}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            ) : (
                <div>Carregando detalhes da máquina...</div>
            )}
        </div>
    );
}

export default DashboardMaquina;
