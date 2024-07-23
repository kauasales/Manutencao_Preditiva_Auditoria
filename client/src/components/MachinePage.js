import React, { useEffect, useState } from 'react';
import MachineTable from './MachineTable';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MachinePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [enabledMachines, setEnabledMachines] = useState([]);
  const [disabledMachines, setDisabledMachines] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/maquinas');
        const allMachines = response.data;
        const enabledMachines = allMachines.filter(maquina => maquina.habilitada === 1);
        const disabledMachines = allMachines.filter(maquina => maquina.habilitada === 0);
        setEnabledMachines(enabledMachines);
        setDisabledMachines(disabledMachines);
      } catch (error) {
        console.error('Erro ao buscar máquinas:', error);
      } 
    };

    fetchData();
  }, []);

  return (
    <div className="machine-page-container">
      <h1>Home / Máquinas</h1>
      <h2>Máquinas</h2>

      <div className='button-and-search-container'>
      <Link to="/cadastro-maquinas">
        <button className='button-cadastro'>
          <img src={`/assets/img/Plus.png`} alt="Ícone Usuários" />
          <span>Novo Cadastro</span>
        </button>
      </Link>

      <input
        type="text"
        placeholder="Nome ou ID da máquina"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      
      <h3>Habilitadas ({enabledMachines.length})</h3>
      <MachineTable machines={enabledMachines} />
      <h3>Desabilitadas ({disabledMachines.length})</h3>
      <MachineTable machines={disabledMachines} />
    </div>
  );
}

export default MachinePage;
