import {FileAddOutlined, FolderAddOutlined} from "@ant-design/icons";
import React from "react";
import {createCharacterFromTreeAPI,} from "../../../../api/generation/characters/tree_structure";
import {v4 as uuidv4} from 'uuid';

// https://blog.logrocket.com/using-react-arborist-create-tree-components/

interface WrraperTreeI {
    projectId: any;
    treeRef: any;
}

const CreaterWrapper: React.FC<WrraperTreeI> = ({projectId, treeRef}) => {


    /*Берем самый большой ID, прибавляем 1
     и присваиваем новому элементу дерева */
    const getNewID = () => {
        return uuidv4();
    }

    /*Библиотека с компонентом дерева, предлагает ввести пользователю имя объекта
    * Чтобы отправить запрос на сохранение в БД, нужно дождаться ввода пользователя */
    const waitForChange = async () => {

        return new Promise<void>((resolve) => {
            const checkChange = () => {
                const newNode = treeRef.current.focusedNode;
                if (newNode === null){
                    setTimeout(checkChange, 100);
                }else {

                    if (newNode.data.name.length > 0)
                        resolve();
                    else if (!newNode.isEditing && newNode.isSelected) {
                        // фокус сместился, мы либо ввели имя, либо нет
                        resolve();
                    } else {
                        setTimeout(checkChange, 100); // Проверяем каждые 100 миллисекунд
                    }
                }
            };

            checkChange();
        });
    };

    // TODO:: добавить, чтобы пустые не создавались, если вдруг мы передумали, а то при удалении
    // будет ошибка status
    const createCharacter = async (newData: any, type: 'leaf' | 'node') => {
        const parentNode = treeRef.current.focusedNode.parent;

        if(parentNode.level !== -1){
            const parentId = parentNode.data.id;
            if(type == 'leaf') {
                const leafInfo = [newData.id, newData.name, type, projectId, parentId];

                const key = newData.id;
                const value = JSON.stringify(leafInfo);

                const treeLeafAr = localStorage.getItem("treeLeaf");
                const parsedtreeLeafAr = treeLeafAr ? JSON.parse(treeLeafAr) : {};
                parsedtreeLeafAr[key] = value;
                const updatedValue = JSON.stringify(parsedtreeLeafAr);
                localStorage.setItem("treeLeaf", updatedValue);
            }else
                await createCharacterFromTreeAPI(newData.id, newData.name, type, projectId, parentId);
        }else{
            if(type == 'leaf') {
                // to local storage
                const leafInfo = [newData.id, newData.name, type, projectId, null];
                const key = newData.id;
                const value = JSON.stringify(leafInfo);

                const treeLeafAr = localStorage.getItem("treeLeaf");
                const parsedtreeLeafAr = treeLeafAr ? JSON.parse(treeLeafAr) : {};
                parsedtreeLeafAr[key] = value;
                const updatedValue = JSON.stringify(parsedtreeLeafAr);
                localStorage.setItem("treeLeaf", updatedValue);
            }else {
                await createCharacterFromTreeAPI(newData.id, newData.name, type, projectId);
            }
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
        const tree = treeRef.current
        const nodeCur = tree.focusedNode;
        const newData = nodeCur.data;
        if (newData.name.length == 0) {
            // узел не создался
            tree.delete(nodeCur.id);
            return false;
        }else {
            newData.id = newID;
        }
        return true;
    }

    const createFolderClick  = async () => {
        const newID = getNewID();

        await treeRef.current.createInternal();

        const status = await setNewID(newID);
        if(status) {
            const newData = treeRef.current.focusedNode.data;
            await createCharacter(newData, 'node');
        }
    }

    const createFileClick = async () => {
        const newID = getNewID()
        await treeRef.current.createLeaf();


        const status = await setNewID(newID);
        if(status) {
            const newData = treeRef.current.focusedNode.data;
            await createCharacter(newData, 'leaf');
        }

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
