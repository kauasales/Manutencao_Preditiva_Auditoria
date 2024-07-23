import React from 'react';

function FormularioMaquina({ maquina, handleChangeMachine }) {
  return (
      <div className="cadastro-maquina-container">
        <table>

          <thead>
          <tr>
            <th colSpan="4">Dados da Máquina</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>
              Nome do Equipamento<br/>
              <input
                  type="text"
                  name="nome"
                  value={maquina.nome}
                  onChange={handleChangeMachine}
                  className="cadastro-maquina-input"
                  required
              />
            </td>
            <td>
              Data de Instalação<br/>
              <input
                  type="date"
                  name="dataInstalacao"
                  value={maquina.dataInstalacao}
                  onChange={handleChangeMachine}
                  className="cadastro-maquina-input"
                  required
              />
            </td>
            <td>
              Modelo<br/>
              <input
                  type="text"
                  name="modelo"
                  value={maquina.modelo}
                  onChange={handleChangeMachine}
                  className="cadastro-maquina-input"
                  required
              />
            </td>
            <td>
              Fabricante<br/>
              <input
                  type="text"
                  name="fabricante"
                  value={maquina.fabricante}
                  onChange={handleChangeMachine}
                  className="cadastro-maquina-input"
                  required
              />
            </td>
          </tr>
          <tr>
            <td>
              Número de Série<br/>
              <input
                  type="text"
                  name="numSerie"
                  value={maquina.numSerie}
                  onChange={handleChangeMachine}
                  className="cadastro-maquina-input"
                  required
              />
            </td>
            <td>
              Setor<br/>
              <select
                  type="text"
                  name="setor"
                  value={maquina.setor}
                  onChange={handleChangeMachine}
                  className="cadastro-maquina-input"
                  required
              >
                <option value="">Selecione o setor</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </td>
            <td>
              <input
                  type="hidden"
                  name="id"
                  value={maquina.idMaquina}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  );
}

export default FormularioMaquina;
