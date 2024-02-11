import React, { useState } from 'react';
import {Card, Switch, Select, Divider, Button} from 'antd';
import { GlobalOutlined, LockOutlined, SettingOutlined } from '@ant-design/icons';
import PersonalSettingForm from "./personalSettingForm";

const { Option } = Select;
const UserSettings: React.FC = () => {
    const [language, setLanguage] = useState('en');
    const [privacyEnabled, setPrivacyEnabled] = useState(true);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, paddingRight: 20 }}>
                <PersonalSettingForm />
            </div>
            <div style={{ flex: 1 }}>
                <Card title="Персональные настройки">

                    <div className="space-x-3 flex" style={{ marginBottom: 10 }}>
                        <GlobalOutlined />
                        <p>Язык</p>
                        <Select value={language} onChange={setLanguage} style={{ minWidth: 120 }}>
                        <Option value="en">English</Option>
                        <Option value="fr">French</Option>
                        <Option value="es">Spanish</Option>
                    </Select>
                    </div>
                    <Divider />
                    <div className="space-x-3 flex" style={{ marginBottom: 10 }}>
                        <LockOutlined />
                        <p>Закрытый аккаунт</p>
                        <Switch checked={privacyEnabled} onChange={setPrivacyEnabled} />
                    </div>

                    <Divider />
                    <div style={{ marginBottom: 10 }} className="space-x-3 flex">
                        <SettingOutlined />
                        <Button>Настройки безопасности</Button>
                    </div>

                </Card>
            </div>
        </div>
    );
};

export default UserSettings;
