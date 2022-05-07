import React, { useState } from "react";
import { TreeItem } from "./TreeItem";
import { treeData } from "./treeData";
import "./Tree.css";

function updateTree(tree = [], dragId, dropId, drags, drops) {
  let dragNode, dropNode, dragIndex, dropIndex;
  let dragObj = drags || {};
  let dropObj = drops || {};
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === dragId) {
      dragNode = tree[i];
      dragIndex = i;
      dragObj.item = dragNode;
      dragObj.index = i;
      dragObj.items = tree;
    }
    if (tree[i].id === dropId) {
      dropNode = tree[i];
      dropIndex = i;
      dropObj.item = dropNode;
      dropObj.index = i;
      dropObj.items = tree;
    }
    if (dragNode && dropNode) {
      const temp = tree[dropIndex];
      tree[dropIndex] = tree[dragIndex];
      tree[dragIndex] = temp;
      dragObj.item = null;
      dropObj.item = null;
      return;
    }
    if (!!tree[i]?.children?.length) {
      updateTree(tree[i].children, dragId, dropId, dragObj, dropObj);
    }
  }
  console.log(dragObj, dropObj);
  if (dragObj.item && dropObj.item) {
    dropObj.items.splice(dropObj.index, 0, dragObj.item);
    dragObj.items.splice(dragObj.index, 1);
    dragObj.item = null;
    dropObj.item = null;
  }
  console.log(tree);
  return tree;
}

function deleteEmptyFolder(tree = []) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].isFolder && !tree[i]?.children?.length) {
      tree.splice(i, 1);
    }
    if (!!tree[i]?.children?.length) {
      deleteEmptyFolder(tree[i].children);
    }
  }
}

function deleteNode(tree = [], nodeId) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === nodeId) {
      tree.splice(i, 1);
      break;
    }
    if (!!tree[i]?.children?.length) {
      deleteNode(tree[i].children, nodeId);
    }
  }
  deleteEmptyFolder(tree);
}

function updateNode(tree = [], nodeId, name) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === nodeId) {
      tree[i] = { ...tree[i], name };
      return tree;
    }
    if (!!tree[i]?.children?.length) {
      updateNode(tree[i].children, nodeId, name);
    }
  }
}

export function Tree() {
  const [treeItems, setTreeItems] = useState(treeData);

  const moveTreeItem = (dragId, dropId) => {
    console.log(dragId, dropId);
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
    console.log(nodeId, name);
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
            onMove={moveTreeItem}
            onDelete={handleDelete}
            onSave={handleSave}
          />
        );
      })}
    </>
  );
}
