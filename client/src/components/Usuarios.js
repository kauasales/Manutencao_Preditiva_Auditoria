import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([
        { id: 1, nome: 'João Pedro', matricula: '#62345', funcao: 'Supervisor', setor: 'Setor X', predio: '1' },
        { id: 2, nome: 'Maria Silva', matricula: '#67890', funcao: 'Administrador', setor: '', predio: '1' }
        // Adicione mais usuários conforme necessário
    ]);

    const [filtro, setFiltro] = useState('');

    const handleFiltroChange = (event) => {
        setFiltro(event.target.value);
    };

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(filtro.toLowerCase()) ||
        usuario.matricula.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="usuario-container">
            <h1>Usuários</h1>
            <h2>Usuários</h2>

            <div className='button-and-search'>
                <Link to="/cadastro-maquinas">
                    <button className='button-cadastro-user'>
                        <img src={`/assets/img/Plus.png`} alt="Ícone Usuários" />
                        <span>Novo Cadastro</span>
                    </button>
                </Link>

                <input
                    type="text"
                    placeholder="Nome ou Matrícula"
                    value={filtro}
                    onChange={handleFiltroChange}
                />
            </div>

            <ul className="usuarios-lista">
                {usuariosFiltrados.map((usuario) => (
                    <li key={usuario.id} className="usuario-item">
                        <div className="usuario-box">
                            <img src={`/assets/img/Plus.png`} alt="Ícone Usuário" className="user-icon" />
                            <div className="usuario-info">
                                <div className="nome-matricula">
                                    <span className="users-nome">{usuario.nome}</span>
                                    <span className="users-matricula">{usuario.matricula}</span>
                                </div>
                                <div className="cargo-setor">
                                    <strong className='users-funcao'>{usuario.funcao}</strong>
                                    {usuario.funcao === 'Supervisor' && (
                                        <div>
                                            <span><strong className='users-funcao'>Setor:</strong> {usuario.setor}</span><br/>
                                            <span><strong className='users-funcao'>Prédio:</strong> {usuario.predio}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="usuario-buttons">
                                <Link to="/visualizar-maquina">
                                    <img src={`/assets/img/Edit.png`} alt="Visualizar" className="icon"/>
                                </Link>
                                <Link to="/cadastro-maquinas">
                                    <img src={`/assets/img/Trash.png`} alt="Editar" className="icon"/>
                                </Link>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Usuarios;
