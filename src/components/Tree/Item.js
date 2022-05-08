import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDrop, useDrag } from "react-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faFolderClosed,
  faPen,
  faTrash,
  faSave,
  faXmark,
  faAdd,
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
  isFolder,
  isOpen,
  onClick,
  onMove,
  onDelete,
  onSave,
  onAdd,
}) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

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

  const toggleAdd = (e) => {
    e.stopPropagation();
    setIsAdd(!isAdd);
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    toggleAdd(e);
    onAdd(id, inputRef.current.value);
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
        <div className="item-name">{name}</div>
      )}
      {isAdd && (
        <input
          className="input-file"
          type="text"
          ref={inputRef}
          placeholder="File name"
          onClick={(e) => e.stopPropagation()}
        />
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
      ) : isAdd ? (
        <div className="actions">
          <button onClick={handleAdd}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button onClick={toggleAdd}>
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
          {isFolder && (
            <button onClick={toggleAdd} title="Add a new file">
              <FontAwesomeIcon icon={faAdd} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

Item.propTypes = {
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  isFolder: PropTypes.bool,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onMove: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onClick: PropTypes.func,
};
