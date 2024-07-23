// Importa o useState do React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FormularioMaquina from './FormularioMaquina';
import FormularioSensor from './FormularioSensor';
import FormularioPlanta from './FormularioPlanta';
import axios from "axios";

function CadastroMaquinas() {
    const [maquina, setMaquina] = useState({
        nome: '',
        numSerie: '',
        dataInstalacao: '',
        fabricante: '',
        modelo: '',
        setor: '',
        idMaquina: ''
    });

    // Define o estado sensores, que será um array de objetos sensor
    const [sensores, setSensores] = useState([{
        numeroSerieSensor: '',
        numAuto: '',
        fabricanteSensor: '',
        tipo: '',
        sensorMin: '',
        sensorMax: '',
        idSensor: '',
        idMaquina: ''
    }]);

    const [etapa, setEtapa] = useState(1);
    const [progressBarIcon, setProgressBarIcon] = useState('Progress Bar-1.png');

    const handleChangeMachine = (e) => {
        const { name, value } = e.target;
        setMaquina(prevState => ({
            ...prevState,
            [name]: value
        }));

        const id = gerarIdMaquina(maquina);
        setMaquina(prevState => ({
          ...prevState,
          idMaquina: id
        }));
    };

    // Define a função handleChangeSensor, que recebe o índice e o evento como parâmetros
    const handleChangeSensor = (index, e) => {
        const { name, value } = e.target;
        const sensoresCopy = [...sensores];
        sensoresCopy[index][name] = value;
        setSensores(sensoresCopy);

        setSensores(sensores.map(sensor => ({
            ...sensor,
            idSensor: gerarIdSensor(sensor),
            idMaquina: maquina.idMaquina
        })));
    };

    // Define a função handleAddSensor, que não recebe parâmetros
    const handleAddSensor = () => {
        const newSensor = {
            numeroSerieSensor: '',
            numAuto: '',
            fabricanteSensor: '',
            tipo: '',
            sensorMin: '',
            sensorMax: '',
            idSensor: '',
            idMaquina: ''
        };
        setSensores([...sensores, newSensor]);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log('Maquina cadastrada:', maquina);

        try {
            const response_maq = await axios.post('http://localhost:8000/api/maquinas',
                JSON.stringify({maquina}),
                {
                    headers: {'Content-Type': 'application/json'}
                });
        }
        catch (error) {
            console.log("Maquina não cadastrada!");
        }

        try {
            for (let sensor of sensores) {
                const response_sen = await axios.post('http://localhost:8000/api/sensores',
                    JSON.stringify({sensor}),
                    {
                        headers: {'Content-Type': 'application/json'}
                    });

                console.log('Sensor cadastrado:', sensor);
            }
        }
        catch (error) {
            console.log("Sensor não cadastrado!");
        }
    };

    const handleNext = () => {
        setEtapa(etapa + 1);
        setProgressBarIcon(`Progress Bar-${etapa + 1}.png`);
    };

    const handlePrevious = () => {
        setEtapa(etapa - 1);
        setProgressBarIcon(`Progress Bar-${etapa - 1}.png`);
    };

    return (
        <div className="cadastro-maquinas">
            <div className="cadastro-maquinas-header">
                <h1>Máquinas / Cadastro de Máquinas</h1>
                <h2>Cadastrar Nova Máquina</h2>
                <img src={`/assets/img/${progressBarIcon}`} alt="Ícone Home" />
            </div>

            <form className="cadastro-maquinas-form">
                {etapa === 1 && (
                    <>
                        <FormularioMaquina maquina={maquina} handleChangeMachine={handleChangeMachine} />
                        {sensores.map((sensor, index) => (
                            <FormularioSensor
                                key={index}
                                sensor={sensor}
                                handleChangeSensor={(e) => handleChangeSensor(index, e)}
                            />
                        ))}
                    </>
                )}

                {etapa === 2 && <FormularioPlanta setProgressBarIcon={setProgressBarIcon} etapa={etapa} />}
                {etapa > 1 && (
                    <button type="button" className="button-cancel-form" onClick={handlePrevious}>
                        Voltar
                    </button>
                )}

                {etapa === 1 && (
                    <button type="button" className="button-cadastro-sensor" onClick={handleAddSensor}>
                        <img src={`/assets/img/Plus.png`} alt="Ícone Usuários"/>
                        <span>Adicionar novo sensor</span>
                    </button>
                )}

                {etapa === 1 && (
                    <button type="button" className="button-next-form" onClick={handleNext}>
                        Próximo
                    </button>
                )}

                {etapa === 1 && (
                    <Link to="/lista-maquinas">
                        <button type="button" className="button-cancel-form">
                            Cancelar
                        </button>
                    </Link>
                )}

                {etapa === 2 && (

                        <button type="submit"
                            className="button-next-form"
                            onClick={(e) => handleSubmit(e)}>
                            <Link to='/lista-maquinas'>
                                Concluir
                            </Link>
                        </button>
                )}
            </form>
        </div>
    );
}

function gerarIdMaquina(maquina) {
    const fabricanteMaq = maquina.fabricante.slice(0, 10).toUpperCase();
    const modelo = maquina.modelo.slice(0, 10).toUpperCase();
    const numSerie = maquina.numSerie.slice().toUpperCase();
    const idMaquina = fabricanteMaq.concat(modelo, numSerie);

    return idMaquina;
}

function gerarIdSensor(sensor) {
    const fabricante = sensor.fabricanteSensor.slice(0, 10).toUpperCase();
    const tipoSensor = sensor.tipo.slice(0, 4).toUpperCase();
    const numSerie = sensor.numeroSerieSensor.slice().toUpperCase();
    const idSensor = fabricante.concat(tipoSensor, numSerie);

    return idSensor;
}

export default CadastroMaquinas;
