import React, { useState } from 'react';

function HistoricoAlertas() {
  const [filtroTempo, setFiltroTempo] = useState('hoje');

  const handleFiltroChange = (event) => {
    setFiltroTempo(event.target.value);
    // Aqui você pode adicionar a lógica para filtrar os alertas com base na opção selecionada
  };

  // Exemplo de dados de alerta (pode ser obtido de uma API ou estado)
  const alerts = [
    { id: 1, machineName: 'Máquina 1', motive: 'Ultrapassou a temperatura ideal', type: 'temperature', condition: 'high', sector: 'Setor A - Prédio 1', serialNumber: '79002893020537', description: 'O sensor 4 superaqueceu', time: '10:20' },
    { id: 2, machineName: 'Máquina 2', motive: 'Ultrapassou os níveis de umidade ideal', type: 'humidity', condition: 'low', sector: 'Setor B - Prédio 2', serialNumber: '34042858888584', description: 'O sensor 7 esfriou', time: '14:50' },
    { id: 3, machineName: 'Máquina 3', motive: 'Está em manutenção', type: 'maintenance', condition: 'warning', sector: 'Setor C - Prédio 3', serialNumber: '24417814999983', description: 'A máquina está em manutenção', time: '20:30' },
    { id: 4, machineName: 'Máquina 4', motive: 'Ultrapassou a temperatura ideal', type: 'temperature', condition: 'low', sector: 'Setor A - Prédio 5', serialNumber: '24417814999983', description: 'O sensor 7 esfriou', time: '11:30' },
    { id: 5, machineName: 'Máquina 5', motive: 'Ultrapassou os níveis de umidade ideal', type: 'humidity', condition: 'high', sector: 'Setor C - Prédio 2', serialNumber: '24417814999983', description: 'O sensor 2 superaqueceu', time: '08:00' },
    { id: 6, machineName: 'Máquina 6', motive: 'Está em manutenção', type: 'maintenance', condition: 'warning', sector: 'Setor C - Prédio 3', serialNumber: '24417814999983', description: 'A máquina está em manutenção', time: '20:30' },
  ];

  // Função para determinar o ícone e a cor da borda com base no tipo e condição da máquina
  const getIconAndBorder = (type, condition) => {
    let icon = '';
    let borderClass = '';

    if (type === 'temperature') {
      icon = condition === 'high' ? '/assets/img/ThermoPlus.png' : '/assets/img/ThermoMinus.png';
      borderClass = condition === 'high' ? 'high-border' : 'low-border';
    } else if (type === 'humidity') {
      icon = condition === 'high' ? '/assets/img/Water.png' : '/assets/img/Water.png';
      borderClass = condition === 'high' ? 'high-border' : 'low-border';
    } else if (type === 'maintenance') {
      icon = '/assets/img/Tools.png';
      borderClass = 'maintenance-border';
    }

    return { icon, borderClass };
  };

  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  };
  

  return (
    <div className="historico-alertas">
      <div className="historico-header">
        <h1>Histórico de Alertas</h1>
        <h2>Histórico de Alertas</h2>
      </div>

      <div className="filtro-container">
        <label htmlFor="filtro-tempo">Data</label>
        <select id="filtro-tempo" value={filtroTempo} onChange={handleFiltroChange}>
          <option value="Hoje">Hoje</option>
          <option value="Últimos 7 dias">Últimos 7 dias</option>
          <option value="Últimos 30 dias">Últimos 30 dias</option>
          <option value="Últimos 90 dias">Últimos 90 dias</option>
        </select>
      </div>

      <div className="current-time">
        <h3>{filtroTempo === 'hoje' ? `Hoje (${getCurrentDate()})` : filtroTempo}</h3>
      </div>

      <div className="historico-lista">
        {alerts.map(alert => {
          const { icon, borderClass } = getIconAndBorder(alert.type, alert.condition);
          return (
            <div key={alert.id} className={`historico-item ${borderClass}`}>
              <img src={icon} alt="Icon" className="machine-icon" />
              <div className="alert-details">
                <div><strong>{alert.machineName} - {alert.motive}</strong></div>
                <div className='alert-section'>
                  #{alert.serialNumber}
                </div>
                <div className='alert-section'>
                  <img src={`/assets/img/Navigation.png`} alt="Setor"/>
                  {alert.sector}
                </div>
                <div>
                  Descrição: {alert.description}
                </div>
                <div className='historico-time'>
                  {alert.time} h
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HistoricoAlertas;
