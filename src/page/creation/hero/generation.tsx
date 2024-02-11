import React, { useState } from 'react';
import {Button, Layout, Spin} from 'antd';

// import {Tree} from 'primereact/tree';

import ImageCanvas from "./canvas";
import HeaderComponent from '../../main/header'
import MenuGeneration from "./generationMenu";

import {generateImageAPI,
    generateImageUndefinedAPI,
    generateImage2ImgAPI} from '../../../api/characters'
import withAuth from "../../../utils/auth/check_auth";
// import {TreeNode} from "primereact/treenode";
// import {InputText} from "primereact/inputtext";


const { Content, Sider } = Layout;


export const GenerationHeroPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [data, setData] = useState([
        {
            key: 'main_hero',
            label: 'Главные',
            children: [
                {
                    key: 'first_ser',
                    label: '1 серия',
                },
                {
                    key: 'second_ser',
                    label: '2 серия',
                },
            ],
        },
        {
            key: 'second_hero',
            label: 'Второстепенные',
            children: [
                { key: '1_ser_second', label: '1 серия' },
                { key: '2_ser_second', label: '2 серия' },
            ],
        },
        {
            key: 'background_hero',
            label: 'Фоновые',
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

    const [newNodeLabel, setNewNodeLabel] = useState('');
    const handleCreateNode = () => {
        const newNode = {
            key: `${new Date().getTime()}`, // Create a unique key (you can adjust as needed)
            label: 'Test node',
        };

        setData([...data, newNode]);
        setNewNodeLabel('');
    };

    const [editingNodeKey, setEditingNodeKey] = useState(null);

    const handleEditNode = (nodeKey: any) => {
        setEditingNodeKey(nodeKey.node.key);
    };
    const handleSaveNode = (editedLabel: any, nodeKey: any) => {
        // Update the label of the edited node
        const updatedTreeData: any = data.map((node) =>
            node.key === nodeKey ? { ...node, label: editedLabel } : node
        );

        // Set the updated tree data
        setData(updatedTreeData);

        // Clear the editing state
        setEditingNodeKey(null);
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
                        {/*<Tree value={data}*/}
                        {/*      className='md:w-30rem'*/}
                        {/*      dragdropScope="demo"*/}
                        {/*      style={{ height: 'calc(100% - 120px)'}}*/}
                        {/*      onDragDrop={(e: any) => setData(e.value)}*/}
                        {/*      onNodeClick={(e: any) => handleEditNode(e)}*/}

                        {/*/>*/}
                        {/*{editingNodeKey && (*/}
                        {/*    <div>*/}
                        {/*        /!*<InputText*!/*/}
                        {/*        /!*    defaultValue={data.find((node) => node.key === editingNodeKey)?.label}*!/*/}
                        {/*        /!*    onBlur={(e) => handleSaveNode(e.target.value, editingNodeKey)}*!/*/}
                                {/*/>*/}
                        {/*    </div>*/}
                        {/*)}*/}

                        {/*<div className='mt-auto'>*/}

                        <Button type="primary" className='p-1 w-1/2'
                                // style={{flex: '1 0 auto'}}
                                onClick={handleCreateNode}>
                            Создать
                        </Button>
                        {/*</div>*/}
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