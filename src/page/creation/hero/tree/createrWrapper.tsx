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


    /*Берем самый большой ID, прибавляем 1
     и присваиваем новому элементу дерева */
    const getNewID = () => {
        const idToIndex = treeRef.treeRef.current.idToIndex
        const ids = Object.keys(idToIndex).map(Number);
        const newID: string = (Math.max(...ids) + 1).toString();

        return newID
    }

    /*Библиотека с компонентом дерева, предлагает ввести пользователю имя объекта
    * Чтобы отправить запрос на сохранение в БД, нужно дождаться ввода пользователя */
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

    const createCharacter = async (newData: any, type: 'leaf' | 'node') => {
        const parentNode = treeRef.treeRef.current.focusedNode.parent;
        if(parentNode.level !== -1){
            const parentId = parentNode.data.id;
            await createCharacterFromTreeAPI(newData.id, newData.name, type, parentId);
        }else{
            await createCharacterFromTreeAPI(newData.id, newData.name, type);
        }
    };

    /*ID меняем для того, чтобы можно было положить в БД
    * По умолчанию создавалось по шаблону simple-node-N,
    * что мешало положить в БД и после отобразить на дереве
    * при select
    * */
    const setNewID = async (newID: string) => {
        // Ждем изменения имени
        await waitForChange();
        const newData = treeRef.treeRef.current.focusedNode.data;
        newData.id = newID
        return newData;
    }

    const createFolderClick  = async () => {
        const newID = getNewID();
        await treeRef.treeRef.current.createInternal(treeRef.treeRef.current.root.id);

        const newData = await setNewID(newID);
        await createCharacter(newData, 'node');
    }

    const createFileClick = async () => {
        const newID = getNewID()
        await treeRef.treeRef.current.createLeaf(treeRef.treeRef.current.root.id)

        const newData = await setNewID(newID);
        await createCharacter(newData, 'leaf');
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
