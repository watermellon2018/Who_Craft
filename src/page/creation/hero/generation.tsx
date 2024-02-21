import React, { useState, useRef, useEffect } from 'react';
import {Layout, Spin} from 'antd';
import NodeTree from './tree/node';
import {get_all_character_for_project} from '../../../api/generation/characters/tree_structure';

import ImageCanvas from "./canvas";
import HeaderComponent from '../../main/header'
import MenuGeneration from "./generationMenu";
import { Tree } from "react-arborist";
import {generateImageAPI,
    generateImageUndefinedAPI,
    generateImage2ImgAPI} from '../../../api/characters'
import withAuth from "../../../utils/auth/check_auth";
import './style.css'
import CreaterWrapper from "./tree/createrWrapper";

// https://blog.logrocket.com/using-react-arborist-create-tree-components/
const { Content, Sider } = Layout;


export const GenerationHeroPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const treeRef = useRef(null);

    const [data, setData] = useState();


    useEffect(() => {
        const getCharacters = async () => {
            const response = await get_all_character_for_project(); // Вызываем функцию для получения данных при загрузке компонента
            const data = response.data;
            setData(data);
        };

        getCharacters();

    }, []);



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
                        <div className="folderFileActions">
                            <CreaterWrapper treeRef={treeRef}/>
                        </div>
                        <Tree
                            openByDefault={false}
                            key='tree_characters'
                            height={600}
                            className='tree'
                            initialData={data}
                            ref={treeRef}>
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