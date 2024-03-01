import React from 'react';
import { Button } from 'antd';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import PathConstants from "../../routes/pathConstant";



const ExitButton: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        navigate(PathConstants.AUTH)
    };
    return (
        <>
            <Button type="primary" key='login' onClick={handleLogout}>Выйти</Button>

        </>
    );
};

export default ExitButton;
