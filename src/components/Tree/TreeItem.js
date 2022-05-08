import React, { useState } from "react";
import { Item } from "./Item";

export function TreeItem({
  name,
  subItems,
  isOpen,
  isFolder,
  id,
  index,
  onMove,
  onDelete,
  onSave,
  onAdd,
}) {
  const [opened, setOpened] = useState(isOpen);

  return (
    <>
      <Item
        name={name}
        id={id}
        index={index}
        onClick={() => setOpened(!opened)}
        isFolder={isFolder}
        isOpen={opened}
        onMove={onMove}
        onDelete={onDelete}
        onSave={onSave}
        onAdd={onAdd}
      />
      {opened && isFolder && (
        <div className="sub-items">
          {subItems.map((item, index) => {
            if (item.children?.length) {
              return (
                <TreeItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  isOpen={item.isOpen}
                  name={item.name}
                  subItems={item.children}
                  isFolder={item.isFolder}
                  onMove={onMove}
                  onDelete={onDelete}
                  onSave={onSave}
                  onAdd={onAdd}
                />
              );
            }
            return (
              <Item
                key={item.id}
                name={item.name}
                id={item.id}
                index={index}
                onMove={onMove}
                onDelete={onDelete}
                onSave={onSave}
                onAdd={onAdd}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
