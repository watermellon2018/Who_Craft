import React from 'react';
import {Form, Input} from 'antd';
import './style.css';
import BottomGenMenu from "./bottomMenu";

interface Img2ImgProps {
    onFinish: (values: any) => void;
}


const Img2ImgForm: React.FC<Img2ImgProps> = ({ onFinish }) => {

    return (
        <Form className='form-gen-img p-3' onFinish={onFinish} layout="vertical">

            <Form.Item label="Url" required name="url">
                <Input className='w-full' />
            </Form.Item>

            <Form.Item label="Prompt" required name="prompt">
                <Input.TextArea />
            </Form.Item>

            <Form.Item label="Характер" name="character">
                <Input.TextArea />
            </Form.Item>

            <BottomGenMenu />
        </Form>
    );
};
export default Img2ImgForm;
