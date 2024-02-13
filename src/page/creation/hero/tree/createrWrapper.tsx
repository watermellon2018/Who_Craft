import {
    CaretRightOutlined,
    SettingOutlined,
    LockOutlined,
    PlusOutlined,
    FolderAddOutlined,
    FileAddOutlined
} from "@ant-design/icons";
import React from "react";
// https://blog.logrocket.com/using-react-arborist-create-tree-components/


const CreaterWrapper = (treeRef: any) => {

    const createFolderClick  = () => {
        console.log(treeRef.treeRef)
        treeRef.treeRef.current.createInternal(treeRef.treeRef.current.root.id)
    }

    const createFileClick = () => {
        treeRef.treeRef.current.createLeaf(treeRef.treeRef.current.root.id)
    }
    return (
        <>
            <button onClick={createFolderClick}
                    style={{color: 'white', marginRight: '5px'}}
                    title="New Folder...">
                <FolderAddOutlined />
            </button>
            <button onClick={createFileClick}
                    style={{color: 'white'}}
                    title="New File...">
                <FileAddOutlined />
            </button>
        </>
    );
};

export default CreaterWrapper;
