import {
    CloseOutlined,
    EditOutlined, FileImageOutlined,
    FolderOpenOutlined, FolderOutlined,
} from "@ant-design/icons";
import React from "react";
import {
    deleteCharacterFromTree,
    renameCharacterFromTree
} from "../../../../api/generation/characters/tree_structure";
// https://blog.logrocket.com/using-react-arborist-create-tree-components/
interface NodeProps {
    node: any;
    style: React.CSSProperties;
    dragHandle?: ((el: (HTMLDivElement | null)) => void) | undefined;
    tree: any; // тип дерева можно заменить на конкретный, если известен
}

const NodeTree: React.FC<NodeProps> = ({ node, style, dragHandle, tree }) => {
    const handleClick = () => {
        if (node.isInternal) {
            node.toggle()
        }
    };

    const handleDelete = () => {
        const idNodeToDel: number = node.id
        const deleteNode = async () => {
            const response = await deleteCharacterFromTree(idNodeToDel);
            if(response.status !== 200){
                console.log('Ошибка при удалении. Статус '+response.status)
            }

        };

        deleteNode();
        tree.delete(node.id)

    };

    const handleEdit = async () => {
        const newValueNode = await node.edit();
        const isCancel = newValueNode['cancelled']
        if(!isCancel){
            const newName = newValueNode['value']
            const response = await renameCharacterFromTree(node.id, newName);
            if(response.status !== 200){
                console.log('Ошибка при переименовании. Статус '+response.status)
            }
        }
    }

    return (
        <div className="node-container flex justify-between" style={style} ref={dragHandle}>
            <div className="node-content"
                 onClick={handleClick}
            >
                {node.isLeaf ? (
                    <>
                        <span id={'span_arrow_tree_character_'+node.id} className="arrow"></span>
                        <span id={'span_icon_tree__character'+node.id} className="file-folder-icon">
                            <FileImageOutlined color="#6bc7f6" />
                        </span>
                    </>
                ) : (
                    <>
                        <span id={'span_arrow_tree_character_'+node.id} className="arrow">
                            {node.isOpen ? <FolderOpenOutlined /> : <FolderOutlined />}
                        </span>
                    </>
                )}

                <span id={'span_text_node_tree_character_'+node.id} className="node-text">
                    {node.isEditing ? (
                        <input
                            type="text"
                            defaultValue={node.data.name}
                            onFocus={(e) => e.currentTarget.select()}
                            onBlur={() => node.reset()}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") node.reset();
                                if (e.key === "Enter") node.submit(e.currentTarget.value);
                            }}
                            autoFocus
                        />
                    ) : (
                        <span id={'span_name_node_tree_character_'+node.id}>{node.data.name}</span>
                    )}

                </span>
            </div>

            <div className="file-actions">
                <div className="folderFileActions">
                    <button onClick={handleEdit} title="Rename...">
                        <EditOutlined />
                    </button>
                    <button onClick={handleDelete} title="Delete">
                        <CloseOutlined />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default NodeTree;
