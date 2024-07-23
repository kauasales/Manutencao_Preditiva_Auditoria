import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="login-container">
      <img src={`/assets/img/Identity.png`} alt="Ídentidade Visual" className='logo-visual'/>
      <img src={`/assets/img/Call.png`} alt="Descrição do Sistema" className='system-description'/>

      <div className="background-image"></div>

      <div className="login-content">
        <h1>Login</h1>
        <form className="login-form">
            <div className="form-group">
                <label htmlFor="matricula">Matrícula</label>
                <input type="text" id="matricula" className="form-login" required />
            </div>
            <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input type="password" id="senha" className="form-login" required />
            </div>

            <div className="form-group-pass">
                <div className='keep-connected'>
                    <input type="checkbox" id="manter-conectado" />
                    Manter-me conectado
                </div>
                <Link to="/" className='recover-password'>
                    Esqueceu a senha?
                </Link>
            </div>

            <div className="form-group">
                <Link to="/home">
                <button className="login-button">Entrar</button>
                </Link>
            </div>

        </form>
      </div>
    </div>
  );
}

export default Login;
