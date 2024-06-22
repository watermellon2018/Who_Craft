import React from 'react';
import {Form, Input, Button, message, Layout, Col, Row} from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import './login.css';
import { login } from '../../api/auth/login';
import PathConstants from "../../routes/pathConstant";

interface LoginFormValues {
    username: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: LoginFormValues) => {
        login(values)
            .then((data: any) => {
                console.log(data);
                if (data.status === 200) {
                    // TODO:: зачем кукисы, если мы используем локальное хранилище. Подумать
                    Cookies.set('id', data.refresh, { expires: 7 });
                    localStorage.setItem('userId', data.refresh);
                    navigate(PathConstants.HOME);
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
                name="login-form "
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='flex flex-col w-full'
                autoComplete="off"
                style={{maxWidth: '600px'}}
            >
                <Row className="justify-center items-start row-field-login">
                    <Row>
                        <Col className="col text-right pr-4" style={{width: '100px'}}>
                            <p>Username:</p>
                        </Col>

                        <Col>

                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                                className='mb-4'
                            >
                                <Input style={{width: '200px'}} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col text-right pr-4" style={{width: '100px'}}>
                            <p>Пароль:</p>
                        </Col>
                        <Col>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                className='mb-4'
                            >
                                <Input.Password style={{width: '200px'}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{width: '100px'}}></Col>
                        <Col>

                <Form.Item className='flex' style={{justifyContent: 'end', width: '200px'}}>
                    <Button style={{width: '100px'}} type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Layout>
    );
};

export default LoginPage;
