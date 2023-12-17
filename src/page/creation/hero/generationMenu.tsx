import React, { useState } from 'react';
import { Card } from 'antd';
import CharacterSetting from "./paramsPerson";
import Img2ImgForm from './img2img';

const tabList = [
    {
        key: 'txt2img',
        label: 'Text2Img',
    },
    {
        key: 'img2img',
        label: 'Img2Img',
    },
];

interface MenuGeneration {
    onFinish: (values: any) => void;
}
const MenuGeneration: React.FC<MenuGeneration> = ({onFinish}) => {
    const [activeTab, setActiveTab] = useState<string>('txt2img');

    const onTab2Change = (key: string) => {
        setActiveTab(key);
    };

    const contentList: Record<string, React.ReactNode> = {
        txt2img: <CharacterSetting onFinish={onFinish}/>,
        img2img: <Img2ImgForm onFinish={onFinish} />,
    };


    return (
        <>
            <Card
                style={{ width: '100%' }}
                tabList={tabList}
                activeTabKey={activeTab}
                onTabChange={onTab2Change}
                tabProps={{
                    size: 'middle',
                }}
            >
                {contentList[activeTab]}
            </Card>
        </>
    );
};

export default MenuGeneration;