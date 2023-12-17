import React, { useState } from 'react';
import type {MenuProps} from 'antd';
import {Layout, Menu, Spin} from 'antd';

import CharacterSetting from "./paramsPerson";
import ImageCanvas from "./canvas";
import HeaderComponent from '../../main/header'

import {generateImageAPI, generateImageUndefinedAPI} from '../../../api/characters'


const { Content, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

// управление по правой кнопки мыши
const items: MenuItem[] = [
    getItem('Главные', 'main_hero', null,[
        getItem('1 серия', 'first_ser'),
        getItem('Второс', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Второстепенные', 'second_hero', null,[
        getItem('Главные', 'first_ser'),
        getItem('Второс', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Фоновые', 'rubbish_hero', null,[
        getItem('Главные', 'first_ser'),
        getItem('Второс', '4'),
        getItem('Alex', '5'),
    ]),

    getItem('Рандомный перс', 'random_rubbish'),

];

export const GenerationHeroPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [imageGeneratedUrl, setImageGeneratedUrl] = useState<string>('');
    const [isGenerated, setIsGenerated] = useState<boolean>(true);

    const onFinish = async (values: any) => {
        setIsGenerated(false);

        // TODO:: переделать / костыль пока оставлю
        const response = Object.keys(values).length > 2
            ? await generateImageAPI(values)
            : await generateImageUndefinedAPI(values);

        const byteArray = response.data;
        const imageUrl = `data:image/png;base64,${byteArray}`;
        setImageGeneratedUrl(imageUrl);
        setIsGenerated(true);
    };

    return (

        <Layout style={{ minHeight: '100vh' }}>

            <HeaderComponent />
            <Layout>
                <Sider collapsible={false} onDoubleClick={toggleCollapsed} theme="dark" className="flex flex-col"
                       collapsed={collapsed} style={{userSelect: 'none'}}>
                    <Menu mode='inline' className="h-[100%]" defaultSelectedKeys={['1']} items={items} />
                </Sider>
                <Layout>

                    <Content style={{ margin: '0 16px'}} className="flex">
                             <div className="flex-grow p-5">
                                 <div className="h-full w-full flex items-center justify-center">
                                     {isGenerated ?
                                         <ImageCanvas imageUrl={imageGeneratedUrl} /> :
                                         <Spin />
                                     }
                                 </div>
                             </div>

                        <div className="w-1/3 p-5">
                            <CharacterSetting onFinish={onFinish}/>
                        </div>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );

}
export default GenerationHeroPage;