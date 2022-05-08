import React, { useRef, useState } from "react";
import { useDrop, useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faFolderClosed,
  faPen,
  faTrash,
  faSave,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const itemStyles = {
  border: "1px dashed gray",
  marginBottom: "8px",
  backgroundColor: "white",
  cursor: "move",
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
  onSave,
}) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);

  const [{ handlerId }, drop] = useDrop({
    accept: "TreeItem",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
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
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "TreeItem",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.4 : 1;
  const styles = isDragging ? itemStyles : {};
  drag(drop(ref));

  const renderIcon = () => {
    if (!isFolder) return null;
    return isOpen ? (
      <FontAwesomeIcon icon={faFolderOpen} />
    ) : (
      <FontAwesomeIcon icon={faFolderClosed} />
    );
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
      {renderIcon()}
      {isEdit ? (
        <input
          type="text"
          defaultValue={name}
          ref={inputRef}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        name
      )}
      {isEdit ? (
        <div className="actions">
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button onClick={toggleEdit}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ) : (
        <div className="actions">
          <button onClick={toggleEdit}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}
    </div>
  );
}
