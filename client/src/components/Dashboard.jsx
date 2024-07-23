import React, { useState, useEffect } from 'react';
import GaugeComponent from 'react-gauge-component';
import axios from 'axios';

let temperatura;
let umidade;
let sensoresTemp;
let sensoresUmid;

const Dashboard = ({ idMaquina }) => {
  // Definindo estados para armazenar a temperatura e a umidade
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(100);
  const [minUmid, setMinUmid] = useState(0);
  const [maxUmid, setMaxUmid] = useState(100);

  // Função para obter a lista de sensores
  const getListaSensoresTemp = async (maquinaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sensores/temperatura/${idMaquina}`, {
        params: {
          maquinaId: maquinaId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar sensores de temperatura:', error);
      return null;
    } 
  };

  const getListaSensoresUmid = async (maquinaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/sensores/umidade/${idMaquina}`, {
        params: {
          maquinaId: maquinaId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar sensores de umidade:', error);
      return null;
    } 
  };

  const getDadosColetadosTemp = async (sensorId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/dados/temperatura/${sensorId}`, {
        params: {
          sensorId: sensorId
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar dados do sensor ${sensorId} de temperatura`, error);
      return null;
    }
  };

  const getDadosColetadosUmid = async (sensorId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/dados/umidade/${sensorId}`, {
        params: {
          sensorId: sensorId
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar dados do sensor ${sensorId} de umidade`, error);
      return null;
    }
  };

  useEffect(() => {
    // Função assíncrona para buscar dados quando o componente é montado ou idMaquina muda
    const fetchData = async () => {
      try {
        // Chama getListaSensores para obter a lista de sensores da máquina
        sensoresTemp = await getListaSensoresTemp(idMaquina);
        sensoresUmid = await getListaSensoresUmid(idMaquina);

        // Verifica se os sensores foram obtidos com sucesso
        if (sensoresTemp) {
          console.log('Lista de sensores de temperatura:', sensoresTemp);
          console.log(sensoresTemp[0].idSensor)
          // Faça o que precisar com a lista de sensores

          const dados = await getDadosColetadosTemp(sensoresTemp[0].idSensor);
          const size = dados.length
          console.log(dados[size - 1].valor);
          temperatura = dados[size - 1].valor;

          setTemperature(temperatura);
          setMinTemp(sensoresTemp[0].minTemp);
          setMaxTemp(sensoresTemp[0].maxTemp);
        } else {
          console.log('Falha ao obter a lista de sensores de temperatura');
        }

        if (sensoresUmid) {
          console.log('Lista de sensores de umidade:', sensoresUmid);
          console.log(sensoresUmid[0].idSensor)
          // Faça o que precisar com a lista de sensores

          const dados = await getDadosColetadosUmid(sensoresUmid[0].idSensor);
          const size = dados.length
          console.log(dados[size - 1].valor);
          umidade = dados[size - 1].valor;


          console.log("Temp min e max")
          console.log(sensoresTemp[0].minTemp)
          console.log(sensoresTemp[0].maxTemp)

          console.log("Umid min e max")
          console.log(sensoresUmid[0].minUmid)
          console.log(sensoresUmid[0].maxUmid)


          setHumidity(umidade);
          setMinUmid(sensoresUmid[0].minUmid);
          setMaxUmid(sensoresUmid[0].maxUmid);
        } else {
          console.log('Falha ao obter a lista de sensores de temperatura');
        }

        } catch (error) {
         console.error('Erro ao buscar sensores:', error);
        }
    };

    // Chama a função fetchData quando o componente é montado e quando idMaquina mudar
    fetchData();

    // Configura o intervalo para atualização de temperatura e umidade
    const interval = setInterval(fetchData, 2000);
  
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [idMaquina]); // Este useEffect é executado sempre que idMaquina mudar


 return (
    <div className="dashboard-container">
      <div className="gauge-container">
        <div style={{ textAlign: 'center', marginTop: '5%' }}>
          <GaugeComponent
            type="semicircle"
            arc={{// Configurações do arco do medidor
              width: 0.2,// Largura do arco
              padding: 0.005, // Padding interno do arco
              cornerRadius: 1, // Raio da borda arredondada
              subArcs: [// Subarcos para definir faixas de temperatura
                // Definindo sub-arcos com cores e tooltips
                { limit: 10, color: '#EA4228', showTick: true, tooltip: { text: 'Temperatura Muito Baixa!' } },
                { limit: 20, color: '#EA4228', showTick: true, tooltip: { text: 'Temperatura Muito Baixa!' } },
                { limit: 30, color: '#F5CD19', showTick: true, tooltip: { text: 'Temperatura Um Pouco Baixa!' } },
                { limit: 40, color: '#5BE12C', showTick: true, tooltip: { text: 'Temperatura OK!' } },
                { limit: 50, color: '#5BE12C', showTick: true, tooltip: { text: 'Temperatura OK!' } },
                { limit: 60, color: '#5BE12C', showTick: true, tooltip: { text: 'Temperatura OK!' } },
                { limit: 70, color: '#5BE12C', showTick: true, tooltip: { text: 'Temperatura OK!' } },
                { limit: 80, color: '#F5CD19', showTick: true, tooltip: { text: 'Temperatura Um Pouco Alta!' } },
                { limit: 90, color: '#EA4228', showTick: true, tooltip: { text: 'Temperatura Muito Alta!' } },
                { color: '#EA4228', tooltip: { text: 'Temperatura Muito Alta!' } }
              ]
            }}
            pointer={{ color: '#345243', length: 0.80, width: 10 }}
            labels={{// Configurações dos rótulos do medidor
              valueLabel: { formatTextValue: value => value + 'ºC' }, // Formatação do valor do medidor
              tickLabels: {
                type: 'outer', // Tipo de rótulo
                valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 10 },
              }
            }}
            value={temperature}
            minValue={minTemp}
            maxValue={maxTemp}
          />
          <p>Temperatura (°C)</p>
        </div>
      </div>
      <div className="gauge-container">
        <div style={{ textAlign: 'center', marginTop: '5%' }}>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              subArcs: [
                { limit: 10, color: '#5BE12C', showTick: true, tooltip: { text: 'Umidade OK!' } },
                { limit: 20, color: '#5BE12C', showTick: true, tooltip: { text: 'Umidade OK!' } },
                { limit: 30, color: '#5BE12C', showTick: true, tooltip: { text: 'Umidade OK!' } },
                { limit: 40, color: '#F5CD19', showTick: true, tooltip: { text: 'Umidade Média!' } },
                { limit: 50, color: '#F5CD19', showTick: true, tooltip: { text: 'Umidade Média!' } },
                { limit: 60, color: '#F5CD19', showTick: true, tooltip: { text: 'Umidade Média!' } },
                { limit: 70, color: '#F5CD19', showTick: true, tooltip: { text: 'Umidade Muito Alta!' } },
                { limit: 80, color: '#EA4228', showTick: true, tooltip: { text: 'Umidade Muito Alta!' } },
                { limit: 90, color: '#EA4228', showTick: true, tooltip: { text: 'Umidade Muito Alta!' } },
                { color: '#EA4228', tooltip: { text: 'Umidade Muito Alta!' } }
              ]
            }}
            pointer={{ color: '#345243', length: 0.80, width: 10 }}
            labels={{
              valueLabel: { formatTextValue: value => value + '%' },
              tickLabels: {
                type: 'outer',
                valueConfig: { formatTextValue: value => value + '%', fontSize: 10 },
              }
            }}
            value={humidity}
            minValue={minUmid}
            maxValue={maxUmid}
          />
          <p>Umidade (%)</p>
        </div>
      </div>
    </div>
 );
};

export default Dashboard;
