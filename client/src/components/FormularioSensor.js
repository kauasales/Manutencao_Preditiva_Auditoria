import React from 'react';

function FormularioSensor({ sensor, handleChangeSensor }) {
  return (
      <div className="cadastro-sensor-container">
        <table>

          <thead>
          <tr>
            <th colSpan="5">Dados do Sensor</th>
          </tr>
          </thead>

          <tbody>
          <tr>
            <td>
              Número de Série<br/>
              <input
                  type="text"
                  name="numeroSerieSensor"
                  value={sensor.numeroSerieSensor}
                  onChange={handleChangeSensor}
                  className="cadastro-sensor-input"
                  required
              />
            </td>
            <td>
              Número Automático<br/>
              <input
                  type="text"
                  name="numAuto"
                  value={sensor.numAuto}
                  onChange={handleChangeSensor}
                  className="cadastro-sensor-input"
                  readOnly
                  required
              />
            </td>
          </tr>
          <tr>
            <td>
              Fabricante<br/>
              <input
                  type="text"
                  name="fabricanteSensor"
                  value={sensor.fabricanteSensor}
                  onChange={handleChangeSensor}
                  className="cadastro-sensor-input"
                  required
              />
            </td>
            <td>
              Tipo<br/>
              <select
                  type="text"
                  name="tipo"
                  value={sensor.tipo}
                  onChange={handleChangeSensor}
                  className="cadastro-sensor-input"
                  required
              >
                <option value="">Selecione o tipo</option>
                <option value="temperatura">Temperatura</option>
                <option value="umidade">Umidade</option>
              </select>
            </td>
            <td>
              Mínimo<br/>
              <input
                  type="number"
                  name="sensorMin"
                  value={sensor.sensorMin}
                  onChange={handleChangeSensor}
                  className="cadastro-sensor-input"
                  required
              />
            </td>
            <td>
              Máximo<br/>
              <input
                  type="number"
                  name="sensorMax"
                  value={sensor.sensorMax}
                  onChange={handleChangeSensor}
                  className="cadastro-sensor-input"
                  required
              />
            </td>
            <td>
              <input
                  type="hidden"
                  name="id"
                  value={sensor.id}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
  );
}

export default FormularioSensor;
