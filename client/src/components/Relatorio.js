import React, { useState } from 'react';

function Relatorio() {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [setor, setSetor] = useState('');
    const [maquina, setMaquina] = useState('');

    const handleGenerateReport = () => {
        // Lógica para gerar o relatório com os filtros selecionados
        console.log('Gerando relatório...');
    };

    return (
        <div className="relatorio-container">
            <div className="relatorio-header">
                <h1>Relatório</h1>
                <h2>Relatório</h2>
            </div>

            <table className="relatorio-table">
                <thead>
                    <tr>
                        <th colSpan={4}>Emitir Relatório</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <label>Data Inicial:</label>
                            <input
                                type="date"
                                value={dataInicial}
                                onChange={(e) => setDataInicial(e.target.value)}
                            />
                        </td>
                        <td>
                            <label>Data Final:</label>
                            <input
                                type="date"
                                value={dataFinal}
                                onChange={(e) => setDataFinal(e.target.value)}
                            />
                        </td>
                        <td>
                            <label>Setor:</label>
                            <select value={setor} onChange={(e) => setSetor(e.target.value)}>
                                <option value="">Selecione o setor</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <label>Selecionar Máquina(s):</label>
                            <select name="maquinas" value={maquina} onChange={(e) => setMaquina(e.target.value)}>
                                <option value="">Selecione a Máquina</option>
                                <option value="A">Máquina 1</option>
                                <option value="B">Máquina 2</option>
                                <option value="C">Máquina 3</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="button-container">
                <button className="button-cancel-report">Cancelar</button>
                <button className="button-next-report" onClick={handleGenerateReport}>Gerar</button>
            </div>
        </div>
    );
}

export default Relatorio;
