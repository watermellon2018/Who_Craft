import React from 'react';
import { Layout } from 'antd';
import {CaretRightOutlined, UserOutlined} from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent: React.FC = () => {
    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {/* Replace 'YourLogo.png' with actual logo file */}
                <CaretRightOutlined style={{ width: '50px', marginRight: '10px' }} />
                <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Craft</span>
            </div>


            <div>
                <UserOutlined style={{ fontSize: '1.5rem', color: 'white', marginRight: '8px' }} />
                <span style={{ color: 'white' }}>KitKat</span>
            </div>
        </Header>
    );
};

export default HeaderComponent;
