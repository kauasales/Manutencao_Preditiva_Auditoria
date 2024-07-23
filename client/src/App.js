import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Login from './components/Login';
import Menu from './components/Menu';
import CadastroMaquinas from './components/CadastroMaquinas';
import MachinePage from './components/MachinePage';
import MachineInfo from './components/MachineInfo';
import MachineOverview from './components/MachineOverview';
import HistoricoAlertas from './components/HistoricoAlertas';
import Usuarios from './components/Usuarios';
import Relatorio from './components/Relatorio';
import DashboardMaquina from './components/DashboardMaquina';
import './styles.css';

function WithMenu() {
  return (
    <div className='app'>
      <Menu />
      <div className='content'>
        <Outlet /> {/* Renderiza as rotas aninhadas aqui */}
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<WithMenu />} > {/* Rotas que necessitam do Menu */}
        <Route path="/home" element={<MachineOverview />} />
        <Route path="/historico" element={<HistoricoAlertas />} />
        <Route path="/lista-maquinas" element={<MachinePage />} />
        <Route path="/cadastro-maquinas" element={<CadastroMaquinas />} />
        <Route path="/visualizar-maquina" element={<MachineInfo />} />
        <Route path="/home/dashboard/:idMaquina" element={<DashboardMaquina />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Route>
    </Routes>
  );
}

export default App;