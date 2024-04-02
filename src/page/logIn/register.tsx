import {Form, Input, Button, Layout, Col, Row} from 'antd';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth/register'
import './registration.css';
import Cookies from "js-cookie";
import PathConstants from "../../routes/pathConstant";

interface RegistrationValues {
    username: string;
    email: string;
    password: string;
    confirm: string;
}

const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: RegistrationValues) => {
        setLoading(true);

        register(values)
            .then((data) => {
                setLoading(false);
                Cookies.set('id', data.refresh, { expires: 7 });
                localStorage.setItem('userId', data.refresh);
                navigate(PathConstants.HOME);
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Layout className='registration-page flex h-screen'>
            <Form
                form={form}
                name="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{maxWidth: '700px'}}
            >
                <Row className="justify-center items-start">
                    <Row>
                        <Col className="col text-right pr-4" style={{width: '200px'}}>
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
                        <Col className="col text-right pr-4" style={{width: '200px'}}>
                            <p>Пароль:</p>
                        </Col>
                        <Col>
                            <Form.Item
                                name="password"
                                hasFeedback
                                rules={[{ required: true, message: 'Please input your password!' }]}
                                className='mb-4'
                            >
                                <Input.Password style={{width: '200px'}} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="col text-right pr-4" style={{width: '200px'}}>
                            <p>Повторите пароль:</p>
                        </Col>
                        <Col>
                            <Form.Item
                                name="confirm-password"
                                className='mb-4'
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(
                                                new Error('The two passwords that you entered do not match!')
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password style={{width: '200px'}} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row>
                        <Col style={{width: '100px'}}></Col>
                        <Col>
                            <Form.Item style={{marginLeft: '120px'}}>
                                <Button style={{width: '180px'}} type="primary" htmlType="submit" loading={loading}>
                                    Зарегистрироваться
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Row>
            </Form>
        </Layout>
    );
};

export default RegistrationPage;
