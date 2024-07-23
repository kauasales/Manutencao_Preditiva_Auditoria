import React from 'react';
import { Link } from 'react-router-dom';

function MachineTable({ machines }) {
  const handleEdit = (machineId) => {
    // Implementar a lógica para abrir a tela de edição com base no ID da máquina
    console.log(`Editar máquina com ID ${machineId}`);
  };

  const handleView = (machineId) => {
    // Implementar a lógica para abrir a tela de visualização com base no ID da máquina
    console.log(`Visualizar máquina com ID ${machineId}`);
  };

  const rows = machines.map((machine) => (
    <tr key={machine.id}>
      <td>{machine.idMaquina}</td>
      <td>{machine.nome.toUpperCase()}</td>
      <td>{machine.setor}</td>
      <td>{((machine.dataInstalacao).slice(0, 10)).split("-").reverse().join("-")}</td>
      <td>
      <Link to="/visualizar-maquina">
        <img
          src={`/assets/img/Eye.png`}
          alt="Visualizar"
          className="icon-eye"
          onClick={() => handleView(machine.id)}
        />
      </Link>
      <Link to="/cadastro-maquinas">
        <img
          src={`/assets/img/Edit.png`}
          alt="Editar"
          className="icon-edit"
          onClick={() => handleEdit(machine.id)}
        />
      </Link>
      </td>
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Setor</th>
          <th>Data de Instalação</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default MachineTable;
