import React, { useState, useRef } from 'react';
import type {MenuProps} from 'antd';
import {Affix, Button, Layout, Menu, Spin} from 'antd';
import NodeTree from './tree/node';
// import {Tree, TreeDragDropEvent} from 'primereact/tree';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.min.css';

// import {Tree} from 'primereact/tree';

import ImageCanvas from "./canvas";
import HeaderComponent from '../../main/header'
import MenuGeneration from "./generationMenu";
import { Tree } from "react-arborist";
import {generateImageAPI,
    generateImageUndefinedAPI,
    generateImage2ImgAPI} from '../../../api/characters'
import withAuth from "../../../utils/auth/check_auth";
import {CaretRightOutlined} from "@ant-design/icons";

import './style.css'
import CreaterWrapper from "./tree/createrWrapper";
// import {TreeNode} from "primereact/treenode";
// import {InputText} from "primereact/inputtext";
// import {TreeNode} from "primereact/treenode";
// import {InputText} from "primereact/inputtext";

// Component for tree project structure
// https://blog.logrocket.com/using-react-arborist-create-tree-components/
const { Content, Sider } = Layout;


export const GenerationHeroPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const treeRef = useRef(null);

    const [data, setData] = useState([
        {
            key: 'main_hero',
            id: 'main_hero',
            name: 'Главные',
            children: [
                {
                    id: 'first_ser',
                    key: 'first_ser',
                    name: '1 серия',
                },
                {
                    id: 'second_ser',
                    key: 'second_ser',
                    name: '2 серия',
                },
            ],
        },
        {
            id: 'second_hero',
            key: 'second_hero',
            name: 'Второстепенные',
            children: [
                { id: '1_ser_second', key: '1_ser_second', name: '1 серия' },
                { id: '2_ser_second', key: '2_ser_second', name: '2 серия' },
            ],
        },
        {
            id: 'background_hero',
            key: 'background_hero',
            name: 'Фоновые',
        },
    ]);



    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const [imageGeneratedUrl, setImageGeneratedUrl] = useState<string>('');
    const [isGenerated, setIsGenerated] = useState<boolean>(true);

    const onFinish = async (values: any) => {
        setIsGenerated(false);
        console.log(values);

        let response;
        // TODO:: переделать / костыль пока оставлю
        if (values['url'] !== undefined){
            response = await generateImage2ImgAPI(values);
        }else {
            response = (Object.keys(values).length > 2)
                ? await generateImageAPI(values)
                : await generateImageUndefinedAPI(values);
        }

        const byteArray = response.data;
        const imageUrl = `data:image/png;base64,${byteArray}`;
        setImageGeneratedUrl(imageUrl);
        setIsGenerated(true);
    };


    return (

        <Layout style={{ minHeight: '100vh' }}>

            <HeaderComponent />
            <Layout>

                <div>

                    {/* TODO:: в отдельный компонент вынести */}
                    <Sider  collapsible={false} onDoubleClick={toggleCollapsed} theme="dark"
                            className="h-screen flex flex-col pt-4 pl-3 pb-5"
                            collapsed={collapsed}
                            style={{userSelect: 'none', display: 'flex',
                                flexDirection: 'column',
                               }}
                    >
                        <div className="folderFileActions"><CreaterWrapper treeRef={treeRef}/></div>
                        <Tree className='tree' initialData={data} ref={treeRef}>
                            {({ node, style, dragHandle, tree }) => (
                                <NodeTree node={node} style={style} dragHandle={dragHandle} tree={tree} />
                            )}
                        </Tree>

                    </Sider>
                </div>

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
                            <MenuGeneration onFinish={onFinish} />
                        </div>

                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );

}
export default withAuth(GenerationHeroPage);