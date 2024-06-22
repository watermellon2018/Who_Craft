import React, { useState } from 'react';
import { Card, Input, Switch, Select, Button } from 'antd';
import { NotificationOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const PersonalSettings: React.FC = () => {
    const [name, setName] = useState('John Doe');
    const [editedName, setEditedName] = useState('');
    const [email, setEmail] = useState('john.doe@example.com');
    const [editedEmail, setEditedEmail] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(true);
    const [notificationFrequency, setNotificationFrequency] = useState('daily');

    const handleNameEdit = () => {
        setIsEditingName(true);
        setEditedName(name);
    };

    const handleNameSave = () => {
        setIsEditingName(false);
        setName(editedName);
    };

    const handleNameCancel = () => {
        setIsEditingName(false);
        setEditedName('');
    };

    const handleEmailEdit = () => {
        setIsEditingEmail(true);
        setEditedEmail(email);
    };

    const handleEmailSave = () => {
        setIsEditingEmail(false);
        setEmail(editedEmail);
    };

    const handleEmailCancel = () => {
        setIsEditingEmail(false);
        setEditedEmail('');
    };

    return (
        <div className="flex justify-between">
            <div className="w-1/2 pr-4">
                <Card title="Пользователь">
                    <div className="flex items-center mb-4">
                        {isEditingName ? (
                            <>
                                <Input value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                                <Button type="primary" icon={<CheckOutlined />} onClick={handleNameSave} className="ml-2" />
                                <Button icon={<CloseOutlined />} onClick={handleNameCancel} className="ml-2" />
                            </>
                        ) : (
                            <>
                                <span className="mr-2">{name}</span>
                                <Button shape="circle" icon={<EditOutlined />} onClick={handleNameEdit} />
                            </>
                        )}
                    </div>
                    <div className="flex items-center">
                        {isEditingEmail ? (
                            <>
                                <Input value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
                                <Button type="primary" icon={<CheckOutlined />} onClick={handleEmailSave} className="ml-2" />
                                <Button icon={<CloseOutlined />} onClick={handleEmailCancel} className="ml-2" />
                            </>
                        ) : (
                            <>
                                <span className="mr-2">{email}</span>
                                <Button shape="circle" icon={<EditOutlined />} onClick={handleEmailEdit} />
                            </>
                        )}
                    </div>
                </Card>
            </div>
            <div className="w-1/2 pl-4">
                <Card title="Настройки уведомлений">
                    <div className="mb-4">
                        <span className="mr-2"><NotificationOutlined /></span>
                        <Switch checked={notificationEnabled} onChange={setNotificationEnabled} />
                    </div>
                    <div>
                        <span className="mr-2">Frequency:</span>
                        <Select value={notificationFrequency} onChange={(value) => setNotificationFrequency(value)} style={{ width: '100px' }}>
                            <Option value="daily">Daily</Option>
                            <Option value="weekly">Weekly</Option>
                            <Option value="monthly">Monthly</Option>
                        </Select>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PersonalSettings;
