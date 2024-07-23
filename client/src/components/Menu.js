import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from './Popup';

const Menu = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = () => {
    // Aqui você pode adicionar a lógica para logout, como limpar o token de autenticação, etc.
    // Depois disso, redirecione para a página de login
    setShowPopup(false); // Fecha o popup após confirmação
    window.location.href = "/login"; // Redireciona para a página de login
  };

  return (
    <div className="menu">
      <div className="system-icon">
        <img src={`/assets/img/Logo.png`} alt="Ícone do Sistema"/>
      </div>

      <div className="current-user">
        <img src={`/assets/img/User.png`} alt="Usuário Atual"/>
        <div className='user-details'>
          <h3>José Bezerra</h3>
          <h5>Administrador</h5>
        </div>
      </div>

      <div className="menu-items">
        {/* Seus links aqui */}
        <Link to="/home">
          <buttom className="button-menu-expand">
            <img src={`/assets/img/Home.png`} alt="Ícone Home" />
            <span>Home</span>
            <buttom className="button-arrow">
              <img src={`/assets/img/Arrow.png`} alt="Ícone Expandir" />
            </buttom>
          </buttom>
        </Link>

        <Link to="/historico">
          <buttom className="button-menu">
            <img src={`/assets/img/Alert.png`} alt="Ícone Alertas" />
            <span>Histórico de Alertas</span>
          </buttom>
        </Link>
      
        <Link to="/lista-maquinas">
          <buttom className="button-menu-expand">
            <img src={`/assets/img/Tools.png`} alt="Ícone Máquinas" />
            <span>Máquinas</span>
            <buttom className="button-arrow">
              <img src={`/assets/img/Arrow.png`} alt="Ícone Expandir" />
            </buttom>
          </buttom>
        </Link>

      
        <Link to="/usuarios">
          <buttom className="button-menu-expand">
            <img src={`/assets/img/Users.png`} alt="Ícone Funcionários" />
            <span>Usuários</span>
            <buttom className="button-arrow">
              <img src={`/assets/img/Arrow.png`} alt="Ícone Expandir" />
            </buttom>
          </buttom>
        </Link>

        
        <Link to="/relatorio">
          <buttom className="button-menu">
            <img src={`/assets/img/Report.png`} alt="Ícone Relatório" />
            <span>Relatórios</span>
          </buttom>
        </Link>
        
      </div>

      <buttom className="button-logout" onClick={handleLogout}>
        <img src={`/assets/img/Logout.png`} alt="Ícone Logout" />
        <span>Logout</span>
      </buttom>

      {showPopup && (
        <Popup trigger={showPopup} setTrigger={setShowPopup} onConfirm={handleConfirmLogout}>
          <div className="message">Você tem certeza que deseja sair?</div>
        </Popup>
      )}
    </div>
  );
};

export default Menu;
