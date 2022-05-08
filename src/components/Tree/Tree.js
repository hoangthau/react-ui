import React, { useState } from "react";
import PropTypes from "prop-types";
import { TreeItem } from "./TreeItem";
import "./Tree.css";
import { updateTree, deleteNode, updateNode, addNode } from "./helpers";

export function Tree({ items = [] }) {
  const [treeItems, setTreeItems] = useState(items);

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
    if (!name) return;
    const newTree = [...treeItems];
    updateNode(newTree, nodeId, name);
    setTreeItems(newTree);
  };

  const handleAdd = (nodeId, name) => {
    if (!name) return;
    const newTree = [...treeItems];
    addNode(newTree, nodeId, name);
    setTreeItems(newTree);
  };

  const handleExport = async () => {
    const fileName = "file";
    const json = JSON.stringify(treeItems);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            onAdd={handleAdd}
          />
        );
      })}
      <button onClick={handleExport}>Export Tree to JSON</button>
    </>
  );
}

Tree.propTypes = {
  items: PropTypes.array,
};
