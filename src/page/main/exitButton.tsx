import React from 'react';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';



const ExitButton: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/start')
    };
    return (
        <>
            <Button type="primary" key='login' onClick={handleLogout}>Выйти</Button>

        </>
    );
};

export default ExitButton;
