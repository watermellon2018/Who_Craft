import {
    FolderAddOutlined,
    FileAddOutlined
} from "@ant-design/icons";
import React from "react";
import {
    createCharacterFromTreeAPI,
} from "../../../../api/generation/characters/tree_structure";
// https://blog.logrocket.com/using-react-arborist-create-tree-components/


const CreaterWrapper = (treeRef: any) => {

    const createFolderClick  = async () => {
        const idToIndex = treeRef.treeRef.current.idToIndex// .current.props.itemCount
        const ids = Object.keys(idToIndex);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newID = Math.max(...ids) + 1;

        await treeRef.treeRef.current.createInternal(treeRef.treeRef.current.root.id)
        // const newNode = treeRef.treeRef.current.focusedNode;


        const waitForChange = async () => {
            return new Promise<void>((resolve) => {
                const checkChange = () => {
                    const newNode = treeRef.treeRef.current.focusedNode;
                    if (newNode.data.name.length > 0) {
                        resolve();
                    } else {
                        setTimeout(checkChange, 100); // Проверяем каждые 100 миллисекунд
                    }
                };
                checkChange();
            });
        };

        // Ждем изменения имени
        await waitForChange();
        const newData = treeRef.treeRef.current.focusedNode.data;

        newData.id = newID
        const createCharacter = async () => {
            const parentNode = treeRef.treeRef.current.focusedNode.parent;
            if(parentNode.level !== -1){
                const parentId = parentNode.data.id;
                const response = await createCharacterFromTreeAPI(newData.id, newData.name, 'node', parentId);
            }else{
                const response = await createCharacterFromTreeAPI(newData.id, newData.name, 'node');
            }
        };

        createCharacter();
    }

    const createFileClick = async () => {
        const idToIndex = treeRef.treeRef.current.idToIndex// .current.props.itemCount
        const ids = Object.keys(idToIndex);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const newID = Math.max(...ids) + 1;

        await treeRef.treeRef.current.createLeaf(treeRef.treeRef.current.root.id)
        const waitForChange = async () => {
            return new Promise<void>((resolve) => {
                const checkChange = () => {
                    const newNode = treeRef.treeRef.current.focusedNode;
                    if (newNode.data.name.length > 0) {
                        resolve();
                    } else {
                        setTimeout(checkChange, 100); // Проверяем каждые 100 миллисекунд
                    }
                };
                checkChange();
            });
        };

        // Ждем изменения имени
        await waitForChange();
        const newData = treeRef.treeRef.current.focusedNode.data;
        newData.id = newID
        const createCharacter = async () => {
            const parentNode = treeRef.treeRef.current.focusedNode.parent;
            if(parentNode.level !== -1){
                const parentId = parentNode.data.id;
                const response = await createCharacterFromTreeAPI(newData.id, newData.name, 'leaf', parentId);
            }else{
                const response = await createCharacterFromTreeAPI(newData.id, newData.name, 'leaf');
            }
        };

        createCharacter();

    };


    return (
        <>
            <button onClick={createFolderClick}
                    style={{color: 'white', marginRight: '5px'}}
                    title="New Folder...">
                <FolderAddOutlined />
            </button>
            <button
                onClick={createFileClick}
                    style={{color: 'white'}}
                    title="New File...">
                <FileAddOutlined />
            </button>
        </>
    );
};

export default CreaterWrapper;
