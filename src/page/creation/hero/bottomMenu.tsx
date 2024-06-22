import React, {useState, useEffect} from "react";
import { Button, Form, Row, Select } from "antd";
import {
    DownOutlined,
    EditOutlined,
    EnvironmentOutlined,
    PictureOutlined,
    PlaySquareOutlined,
    SaveOutlined, SmileOutlined
} from "@ant-design/icons";
import './style.css';

const { Option } = Select;

const BottomGenMenu = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
        window.removeEventListener('resize', handleResize);
    };
    }, []);

    const buttonGen = windowWidth < 1200 ? (
        <>
            <Button className='mt-2 border border-black'
                    type="primary"
                    htmlType="submit"
                    icon={<PlaySquareOutlined />}
            />
        </>
    ) : (
        <>
            <Button className='mt-2 border border-black' type="primary" htmlType="submit">
                Генерировать
            </Button>
        </>
    );


    const selectGen = windowWidth < 1200 ? (
        <>
            <Select className='mt-2' style={{maxWidth: '85px'}}>
                <Option value="real">Реалистичный</Option>
                <Option value="cartoon">Мультфильм</Option>
                <Option value="anime">Аниме</Option>
            </Select>
        </>
    ) : (
        <>
            <Select className='mt-2'>
                <Option value="real">Реалистичный</Option>
                <Option value="cartoon">Мультфильм</Option>
                <Option value="anime">Аниме</Option>
            </Select>
        </>
    );

    return (
        <Row gutter={[8, 8]} className='button-menu-bottom flex justify-between'>
            <div className='flex mr-2'>
                <p className="mb-1 text-gray-700 self-end mr-4 ml-2">Стиль:</p>
                <Form.Item name='styleGen' initialValue='real'>
                    {selectGen}
                </Form.Item>
            </div>

            <div>
                <Form.Item>
                    {buttonGen}
                </Form.Item>
            </div>
        </Row>
    );
};

export default BottomGenMenu;
