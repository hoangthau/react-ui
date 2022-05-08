import React, { useState } from "react";
import { TreeItem } from "./TreeItem";
import { treeData } from "./treeData";
import "./Tree.css";
import { updateTree, deleteNode, updateNode } from "./helpers";

export function Tree() {
  const [treeItems, setTreeItems] = useState(treeData);

  const handleMove = (dragId, dropId) => {
    const newTree = [...treeItems];
    updateTree(newTree, dragId, dropId);
    setTreeItems(newTree);
  };

  const handleDelete = (nodeId) => {
    const newTree = [...treeItems];
    deleteNode(newTree, nodeId);
    setTreeItems(newTree);
  };

  const handleSave = (nodeId, name) => {
    const newTree = [...treeItems];
    updateNode(newTree, nodeId, name);
    setTreeItems(newTree);
  };

  return (
    <>
      {treeItems.map((item, index) => {
        return (
          <TreeItem
            key={item.id}
            index={index}
            id={item.id}
            isOpen={item.isOpen}
            name={item.name}
            subItems={item.children}
            isFolder={item.isFolder}
            onMove={handleMove}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        );
      })}
    </>
  );
}
