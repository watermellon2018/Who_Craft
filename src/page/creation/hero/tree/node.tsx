import {
    CaretRightOutlined,
    CloseOutlined,
    EditOutlined, FileImageOutlined,
    FolderOpenOutlined, FolderOutlined,
    GlobalOutlined,
    LockOutlined
} from "@ant-design/icons";
import React from "react";
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
            node.toggle();
        }
    };

    return (
        <div className="node-container flex justify-between" style={style} ref={dragHandle}>
            <div className="node-content" onClick={handleClick}>
                {node.isLeaf ? (
                    <>
                        <span className="arrow"></span>
                        <span className="file-folder-icon">
                            <FileImageOutlined color="#6bc7f6" />
                        </span>
                    </>
                ) : (
                    <>
                        <span className="arrow">
                            {node.isOpen ? <FolderOpenOutlined /> : <FolderOutlined />}
                        </span>
                    </>
                )}

                <span className="node-text">
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
                        <span>{node.data.name}</span>
                    )}

                </span>
            </div>

            <div className="file-actions">
                <div className="folderFileActions">
                    <button onClick={() => node.edit()} title="Rename...">
                        <EditOutlined />
                    </button>
                    <button onClick={() => tree.delete(node.id)} title="Delete">
                        <CloseOutlined />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default NodeTree;
