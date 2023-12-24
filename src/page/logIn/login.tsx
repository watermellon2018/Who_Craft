import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './login.css';
import { login } from '../../api/auth/login';

const layout = {
    wrapperCol: { span: 16 },
};

interface LoginFormValues {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: LoginFormValues) => {
        login(values)
            .then((data: any) => {
                if (data.status === 'success') {
                    Cookies.set('token', data.refresh, { expires: 7 });
                    navigate('/');
                } else {
                    message.error('Пользователь не найден в базе');
                }
            })
            .catch((error: any) => {
                console.error(error);
                // Consider updating your error handling here
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login-page'>
            <Form
                {...layout}
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='flex flex-col w-full'
            >
                <Form.Item
                    label="Ты кто?"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    className='mb-4 w-1/2'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    className='mb-4 w-1/2'
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ span: 16 }} className='w-1/2'>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;
