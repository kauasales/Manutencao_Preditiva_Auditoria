import React, { useState } from 'react';

function FormularioPlanta({ setProgressBarIcon, etapa }) {
  const [imagem, setPlanta] = useState(null);
  const [showButton, setShowButton] = useState(true);

    const handleChangePlanta = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setPlanta(reader.result);
            setShowButton(false);
            setProgressBarIcon(`Progress Bar-${etapa + 1}.png`);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

  return (
    <div className="formulario-planta">
        <table>
            <thead>
                <tr>
                    <th>Vista Superior</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="planta-container">
                        {showButton && (
                            <label htmlFor="upload-input" className="upload-button">
                                <input
                                    id="upload-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangePlanta}
                                />
                                <img src={`/assets/img/Planta.png`} alt="Ícone Planta" /><br/>
                                Adicionar Imagem
                            </label>
                        )}
                        {imagem && (
                            <div className="imagem-preview">
                                <img src={imagem} alt="Planta" />
                            </div>
                        )}
                    </td>
                </tr>
                <tr>
                    <td>
                        Arraste para posicionar os sensores:
                    </td>
                </tr>
                <tr>
                    <td>
                        {/* Lista de Sensores */}
                    </td>
                </tr>
            </tbody>
        </table>
            
    </div>
  );
}

export default FormularioPlanta;
