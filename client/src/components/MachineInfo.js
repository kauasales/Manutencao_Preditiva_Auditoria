import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';

function MachineInfo() {
    const [maquinaHabilitada, setMaquinaHabilitada] = useState(true);
    const [confirmPopup, setConfirmPopup] = useState(false);

    const toggleMaquina = () => {
        setConfirmPopup(true); // Define o estado do popup de confirmação como true para exibi-lo
    };

    const handleConfirm = () => {
        setMaquinaHabilitada(!maquinaHabilitada); // Alternar o estado da máquina entre habilitada e desabilitada
        setConfirmPopup(false); // Fechar o popup de confirmação após a confirmação
    };
    const popupMessage = maquinaHabilitada ? 'Tem certeza que deseja desabilitar a máquina?' : 'Tem certeza que deseja habilitar a máquina?';

    return (
        <div className="overlay">
            <div className="modal">
                <div className="cadastro-maquina-container">

                    <div className='view-header'>
                        <img src={`/assets/img/Eye.png`} alt="Ícone Visualizar" className='view-icon'/>
                        <h3>Visualizar</h3>
                        <Link to="/lista-maquinas">
                            <button>
                                <img src={`/assets/img/Close.png`} alt="Ícone Home" className='view-close'/>
                            </button>
                        </Link>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th colSpan="4">Dados da Máquina</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    Nome do Equipamento<br />
                                    <input
                                        type="text"
                                        name="nome"
                                        value={'Zero'}
                                        className="cadastro-maquina-input"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    Data de Instalação<br />
                                    <input
                                        type="date"
                                        name="dataInstalacao"
                                        value={'Zero'}
                                        className="cadastro-maquina-input"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    Modelo<br />
                                    <input
                                        type="text"
                                        name="modelo"
                                        value={'Zero'}
                                        className="cadastro-maquina-input"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    Fabricante<br />
                                    <input
                                        type="text"
                                        name="fabricante"
                                        value={'Zero'}
                                        className="cadastro-maquina-input"
                                        readOnly
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Número de Série<br />
                                    <input
                                        type="text"
                                        name="numeroSerie"
                                        value={'Zero'}
                                        className="cadastro-maquina-input"
                                        readOnly
                                    />
                                </td>
                                <td>
                                    Setor<br />
                                    <input
                                        type="text"
                                        name="setor"
                                        value={'Zero'}
                                        className="cadastro-maquina-input"
                                        readOnly
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="formulario-planta">
                        <table>
                            <thead>
                                <tr>
                                    <th>Planta Baixa</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="planta-container">
                                        <div className={`imagem-preview ${maquinaHabilitada ? '' : 'disabled'}`}>
                                            <img src={`/assets/img/maquina01.png`} alt="Planta" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <button className="desabilitar-button" onClick={toggleMaquina}>{maquinaHabilitada ? 'Desabilitar' : 'Habilitar'}</button>
                    
                    <Popup trigger={confirmPopup} setTrigger={setConfirmPopup} onConfirm={handleConfirm}>
                        <div className="popup-inner">
                            <div className="message">{popupMessage}</div>
                        </div>
                    </Popup>

                </div>
            </div>
        </div>
    );
}

export default MachineInfo;
