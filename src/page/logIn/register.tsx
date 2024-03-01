import {Form, Input, Button, Layout} from 'antd';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth/register'
import './registration.css';
import Cookies from "js-cookie";

// const layout = {
//     wrapperCol: { span: 16 },
// };

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
                navigate('/');
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
        <Layout className='registration-page flex h-screen'>
            <Form
                form={form}
                name="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='flex flex-col w-full'
                labelCol={{ offset: 3, span: 5 }}
                wrapperCol={{ offset: 1, span: 10 }}
                autoComplete="off"
            >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    className='mb-4 w-1/2'
                >
                    <Input />
                </Form.Item>

                <p>Пароль</p>
                <Form.Item
                    label="Пароль"
                    name="password"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    className='mb-4 w-1/2'
                >
                    <Input.Password />
                </Form.Item>

                <p>Повторите пароль</p>
                <Form.Item
                    name="confirm-password"
                    label="Повторите пароль"
                    className='mb-4 w-1/2'
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
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 17 }} className='w-1/2'>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

export default RegistrationPage;
