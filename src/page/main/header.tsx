import React from 'react';
import { Layout } from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import ExitButton from "./exitButton";
import LogoButton from "./logo";

const { Header } = Layout;


const HeaderComponent: React.FC = () => {
    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <LogoButton />
            </div>

            <div>
                <Link to='/profile' style={{ fontSize: '1.5rem', color: 'white', marginRight: '8px' }}>
                    <UserOutlined />
                </Link>
                <ExitButton />
            </div>

        </Header>
    );
};

export default HeaderComponent;
