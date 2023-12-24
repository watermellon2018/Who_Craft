import React from 'react';
import { Form, Input, Button, message, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './login.css';
import { login } from '../../api/auth/login';

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
        <Layout className='login-page'>
            <Form

                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='flex flex-col w-full'
                labelCol={{ offset: 4, span: 2 }}
                wrapperCol={{ offset: 1, span: 10 }}
                autoComplete="off"

            >
                <Form.Item
                    label="Ты кто"
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

                <Form.Item wrapperCol={{ span: 12, offset: 15 }} className='w-1/2'>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default LoginPage;
