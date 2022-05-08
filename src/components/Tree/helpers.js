export function updateTree(tree = [], dragId, dropId, drags, drops) {
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
  if (dragObj.item && dropObj.item) {
    dropObj.items.splice(dropObj.index, 0, dragObj.item);
    dragObj.items.splice(dragObj.index, 1);
    dragObj.item = null;
    dropObj.item = null;
  }
  return tree;
}

export function deleteEmptyFolder(tree = []) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].isFolder && !tree[i]?.children?.length) {
      tree.splice(i, 1);
    }
    if (!!tree[i]?.children?.length) {
      deleteEmptyFolder(tree[i].children);
    }
  }
}

export function deleteNode(tree = [], nodeId) {
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

export function updateNode(tree = [], nodeId, name) {
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

export function addNode(tree = [], nodeId, name) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === nodeId && Array.isArray(tree[i].children)) {
      tree[i].children.push({ id: Math.round(Math.random() * 1e9), name });
      return tree;
    }
    if (!!tree[i]?.children?.length) {
      addNode(tree[i].children, nodeId, name);
    }
  }
}
