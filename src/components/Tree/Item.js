import React, { useRef, useState } from "react";
import { useDrop, useDrag } from "react-dnd";

const itemStyles = {
  border: "1px dashed gray",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move"
};

export function Item({
  name,
  id,
  index,
  onClick,
  onMove,
  isFolder,
  isOpen,
  onDelete,
  onSave
}) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);

  const [{ handlerId }, drop] = useDrop({
    accept: "TreeItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragId = item.id;
      const hoverId = id;
      if (dragId === hoverId) {
        return;
      }
      onMove(dragId, hoverId);
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TreeItem",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });
  const opacity = isDragging ? 0.4 : 1;
  const styles = isDragging ? itemStyles : {};
  drag(drop(ref));

  const renderIcon = () => {
    if (!isFolder) return null;
    return isOpen ? "-" : "+";
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(id);
  };

  const toggleEdit = (e) => {
    e.stopPropagation();
    setIsEdit(!isEdit);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onSave(id, inputRef.current.value);
    toggleEdit(e);
  };

  return (
    <div
      ref={ref}
      style={{ ...styles, opacity }}
      data-handler-id={handlerId}
      onClick={onClick}
      className="item"
    >
      <span className="icon-folder">{renderIcon()}</span>
      {isEdit ? <input type="text" defaultValue={name} ref={inputRef} /> : name}
      {isEdit ? (
        <div className="actions">
          <button onClick={handleEdit}>Save</button>
          <button onClick={toggleEdit}>Cancel</button>
        </div>
      ) : (
        <div className="actions">
          <button onClick={toggleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}
