import React from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import {CaretRightOutlined} from "@ant-design/icons";
import './components.css'


const LogoButton: React.FC = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/')
    };
    return (
        <div className="flex logo" onClick={handleClick}>
            <CaretRightOutlined style={{ width: 'auto', color: 'white', marginRight: '10px' }} />
            <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', marginRight: '10px'}}>Craft</span>
        </div>
    );
};

export default LogoButton;
