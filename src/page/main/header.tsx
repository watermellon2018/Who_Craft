import React from 'react';
import { Layout, Button } from 'antd';
import {CaretRightOutlined, UserOutlined} from '@ant-design/icons';
import Cookies from 'js-cookie';
import {useNavigate, Link} from 'react-router-dom';

const { Header } = Layout;


const HeaderComponent: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/start')
    };
    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Replace 'YourLogo.png' with actual logo file */}
                <CaretRightOutlined style={{ width: '50px', marginRight: '10px' }} />
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Craft</span>
            </div>

            <div>
                <Link to='/profile' style={{ fontSize: '1.5rem', color: 'white', marginRight: '8px' }}>
                    <UserOutlined />
                </Link>
                <Button type="primary" key='login' onClick={handleLogout}>Выйти</Button>
            </div>

        </Header>
    );
};

export default HeaderComponent;
