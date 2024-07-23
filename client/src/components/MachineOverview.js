import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

function MachineOverview() {
  const sectors = ['Setor A', 'Setor B', 'Setor C']; // Definindo os setores disponíveis
  const [currentSectorIndex, setCurrentSectorIndex] = useState(0); // Índice do setor atual

  const [machines, setMachines] = useState([]); // Estado para armazenar as máquinas

  // Função para carregar as máquinas do banco de dados
  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/maquinas');
      setMachines(response.data); // Atualiza o estado com as máquinas recebidas
    } catch (error) {
      console.error('Erro ao buscar máquinas:', error);
    }
  };

  // useEffect para carregar as máquinas quando o componente é montado
  useEffect(() => {
    fetchMachines();
  }, []);


  const [alerts, setAlerts] = useState([
    { id: 1, machineName: 'Máquina 9', sector: 'Setor C', condition: 'error' },
    { id: 2, machineName: 'Máquina 3', sector: 'Setor B', condition: 'warning' },
    { id: 3, machineName: 'Máquina 5', sector: 'Setor C', condition: 'error' },
  ]);

  // Função para navegar para o próximo setor
  const nextSector = () => {
    setCurrentSectorIndex((prevIndex) => (prevIndex + 1) % sectors.length);
  };

  // Função para navegar para o setor anterior
  const prevSector = () => {
    setCurrentSectorIndex((prevIndex) =>
      prevIndex === 0 ? sectors.length - 1 : prevIndex - 1
    );
  };

  const handleSectorChange = (sectorIndex) => {
    setCurrentSectorIndex(sectorIndex);
    // Aqui você pode atualizar a lista de máquinas com base no setor selecionado
  };

  // Função para mapear o estado numérico para a classe CSS
  const mapConditionToClass = (condicao) => {
    switch(condicao) {
      case 0: return 'good';
      case 1: return 'warning';
      case 2: return 'error';
      default: return '';
    }
  };

  const mapStateToText = (estado) => {
    switch(estado) {
      case 0: return 'Operando em condições normais';
      case 1: return 'Alterações críticas';
      case 2: return 'Em manutenção';
      default: return '';
    }
  };

  // Função para mapear a letra do setor para o nome completo do setor
  const mapSectorToFullName = (sectorLetter) => {
    const sectorNames = {
      'A': 'Setor A',
      'B': 'Setor B',
      'C': 'Setor C'
    };
    return sectorNames[sectorLetter] || 'Setor Desconhecido';
  };

  const navigate = useNavigate();

  // Função para lidar com o clique na máquina
  const handleMachineClick = (idMaquina) => {
    // Redireciona para a rota 'dashboard' com o 'idMaquina' como parâmetro
    navigate(`/dashboard/${idMaquina}`);
  };

  return (
      <div className="machine-overview">
        <div className="machine-overview-header">
          <h1>Home / Visão Geral / {sectors[currentSectorIndex]}</h1>
          <h2>Visão Geral</h2>
        </div>

        <div className="sector-selection">
          <img src={`/assets/img/Sort Left.png`} alt="Setor Anterior" onClick={prevSector}
               className='sector-arrow-prev'/>
          <span>{sectors[currentSectorIndex]}</span> {/* Exibe o setor atual */}
          <img src={`/assets/img/Sort Left.png`} alt="Setor Anterior" onClick={nextSector}
               className='sector-arrow-next'/>
        </div>

        {/* Alertas */}
        <div className="alerts">
          <h2>
            <img src={`/assets/img/Alert.png`} alt="Ícone Alerta" className='alert-icon'/>
            Alertas
          </h2>
          <ul>
            {alerts.map((alert) => (
                <li key={alert.id} className={`alert-item ${alert.condition}`}>
                  <div className="alert-info">
                    <h3>
                      {alert.machineName}
                      <img src={`/assets/img/Eye.png`} alt="Ícone Visualizar" className='eye-icon'/>
                    </h3>
                    <p>{alert.sector}</p>
                  </div>
                </li>
            ))}
          </ul>
        </div>

        {/* Lista de Máquinas */}
        <div className="machine-list">
          {machines
              .filter(machine => mapSectorToFullName(machine.setor) === sectors[currentSectorIndex])
              .map((machine) => (
                  <div key={machine.id} className={`machine-item ${mapConditionToClass(machine.condicao)}`}>
                    <div className="machine-info">
                      <h3>
                        {machine.nome}
                        {/* Link para a página de dashboard da máquina */}
                        <Link to={`dashboard/${machine.idMaquina}`}>
                          <img src={`/assets/img/Eye.png`} alt="Ícone Visualizar" className='eye-icon'/>
                        </Link>
                      </h3>
                      <p>{machine.idMaquina}</p>
                      <div className={`machine-state ${mapConditionToClass(machine.condicao)}`}>
                        {mapStateToText(machine.estado)}
                      </div>
                    </div>
                  </div>
              ))}
        </div>
      </div>
  );
}

export default MachineOverview;
