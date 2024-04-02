import {Button} from "antd";
import {EditOutlined, SaveOutlined} from "@ant-design/icons";
import React from "react";

const topMenu = windowWidth > 1200 ? (
    <>
        <Button onClick={handleGenImage} className='mr-3'>Редактировать</Button>
        <Button onClick={settingHeroHandle} className='mr-3'>Сохранить</Button>
    </>
) : (
    <>
        <Button onClick={handleGenImage} className='mr-3' icon={<EditOutlined />} />
        <Button onClick={settingHeroHandle} className='mr-3' icon={<SaveOutlined />} />
    </>
);