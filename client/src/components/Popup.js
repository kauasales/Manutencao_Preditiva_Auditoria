// Popup.js
import React from 'react';
import './Popup.css';

const Popup = ({ trigger, setTrigger, onConfirm, children, redirectUrl }) => {
    const handleConfirm = () => {
        onConfirm();
        window.location.href = redirectUrl;
    };

    return trigger ? (
        <div className="popup-background">
            <div className="popup">
                <div className="popup-inner">
                    {children}
                    <div className="buttons">
                        <button className="cancel-btn" onClick={() => setTrigger(false)}>Cancelar</button>
                        <button className="disable-btn" onClick={handleConfirm}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Popup;
