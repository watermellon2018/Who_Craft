import { Form, Input, Button } from 'antd';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/auth/register'
import './registration.css';

const layout = {
    wrapperCol: { span: 16 },
};

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
            .then(() => {
                setLoading(false);
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
        <div className='registration-page flex justify-center items-center h-screen'>
            <Form
                {...layout}
                form={form}
                name="register"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className='flex flex-col w-full'
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    className='mb-4 w-1/2'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not a valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    hasFeedback
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    className='mb-4 w-1/2'
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="Повторите пароль"
                    label="Confirm Password"
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

                <Form.Item wrapperCol={{ span: 16 }} className='w-1/2'>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegistrationPage;
